    using FellowOakDicom;
using FellowOakDicom.Imaging;
using Mini_visualiseur_DICOM_web.Application.DTO;
    using Mini_visualiseur_DICOM_web.Application.DTO.DicomViewer.Api.Dtos;
    using Mini_visualiseur_DICOM_web.Application.IServices;
    using Mini_visualiseur_DICOM_web.Domain;
    using Mini_visualiseur_DICOM_web.Infrastructure.IRepository;
using SixLabors.ImageSharp;
namespace Mini_visualiseur_DICOM_web.Application.Services
{
    public class DicomStudyService : IDicomStudyService
    {
        private readonly IDicomStudyRepository _repository;
        private readonly ILogger<DicomStudyService> _logger;
        private readonly string _storageRoot;

        public DicomStudyService(
            IDicomStudyRepository repository,
            ILogger<DicomStudyService> logger,
            IWebHostEnvironment env)
        {
            _repository = repository;
            _logger = logger;
            _storageRoot = Path.Combine(env.ContentRootPath, "StoredFiles");
            Directory.CreateDirectory(_storageRoot);
        }

        public async Task<DicomStudyUploadResultDto> ImportAsync(
        IFormFile file,
        CancellationToken ct = default)
        {
            var id = Guid.NewGuid();

            var storedPath = Path.Combine(_storageRoot, $"{id}.dcm");

            await SaveToDiskAsync(file, storedPath, ct);

            var dicomFile = DicomFile.Open(storedPath);

            var dataset = dicomFile.Dataset;

            var studyInstanceUid = dataset.GetSingleValueOrDefault(
                DicomTag.StudyInstanceUID,
                string.Empty);

            if (string.IsNullOrWhiteSpace(studyInstanceUid))
            {
                throw new InvalidOperationException("Cette étude DICOM existe déjà.");
            }

            bool exists = await _repository.ExistsByStudyInstanceUidAsync(
                studyInstanceUid,
                ct);

            if (exists)
            {
                File.Delete(storedPath);

                throw new Exception("Cette étude DICOM existe déjà.");
            }

            var study = BuildStudyEntity(
                id,
                file,
                storedPath,
                dataset);

            await _repository.AddAsync(study, ct);

            _logger.LogInformation(
                "Étude DICOM importée : {Id} ({FileName})",
                study.Id,
                study.OriginalFileName);

            return new DicomStudyUploadResultDto(study.Id);
        }
        private static async Task SaveToDiskAsync(IFormFile file, string storedPath, CancellationToken ct)
        {
            await using var stream = File.Create(storedPath);
            await file.CopyToAsync(stream, ct);
        }

        private static DicomStudy BuildStudyEntity(Guid id, IFormFile file, string storedPath, DicomDataset dataset)
        {
            return new DicomStudy
            {
                Id = id,
                StudyInstanceUid = dataset.GetSingleValueOrDefault(
            DicomTag.StudyInstanceUID,
            string.Empty),

                PatientId = dataset.GetSingleValueOrDefault(DicomTag.PatientID, string.Empty),
                PatientName = dataset.GetSingleValueOrDefault(DicomTag.PatientName, string.Empty),
                Modality = dataset.GetSingleValueOrDefault(DicomTag.Modality, string.Empty),
                StudyDate = TryParseDicomDate(dataset.GetSingleValueOrDefault(DicomTag.StudyDate, string.Empty)),
                Width = dataset.GetSingleValueOrDefault(DicomTag.Columns, (ushort)0),
                Height = dataset.GetSingleValueOrDefault(DicomTag.Rows, (ushort)0),
                OriginalFileName = file.FileName,
                StoredFilePath = storedPath,
                FileSizeBytes = file.Length,
                UploadedAt = DateTime.UtcNow
            };
        }

        private static DateTime? TryParseDicomDate(string? value)
        {
            if (string.IsNullOrWhiteSpace(value)) return null;
            return DateTime.TryParseExact(value, "yyyyMMdd", null,
                System.Globalization.DateTimeStyles.None, out var date) ? date : null;
        }

        public async Task<List<DicomStudyDto>> GetAllAsync(CancellationToken ct = default)
        {
            var studies = await _repository.GetAllAsync(ct);

            return studies.Select(MapToDto).ToList();
        }

        private static DicomStudyDto MapToDto(DicomStudy s) => new(
            s.Id,
            s.PatientId,
            s.PatientName,
            s.Modality,
            s.StudyDate,
            s.Width,
            s.Height,
            s.OriginalFileName,
            s.FileSizeBytes,
            s.UploadedAt
        );
        public async Task<byte[]?> GetImageAsync(
    Guid studyId,
    double? ww,
    double? wl, CancellationToken ct = default)
        {
            var study = await _repository.GetByIdAsync(studyId, ct);

            if (study == null || !File.Exists(study.StoredFilePath))
                return null;


            var dicomFile = await DicomFile.OpenAsync(study.StoredFilePath);


            var dicomImage = new DicomImage(dicomFile.Dataset);

            if (ww.HasValue && wl.HasValue)
            {
                dicomImage.WindowWidth = ww.Value;
                dicomImage.WindowCenter = wl.Value;
            }
            var renderedImage = dicomImage.RenderImage();


            if (renderedImage == null)
            {
                _logger.LogError(
                    "Impossible de rendre l'image DICOM {Id}",
                    studyId
                );

                return null;
            }



            using var image = renderedImage.AsSharpImage();


            using var ms = new MemoryStream();


            await image.SaveAsPngAsync(ms, ct);


            return ms.ToArray();
        }
    }

    }

