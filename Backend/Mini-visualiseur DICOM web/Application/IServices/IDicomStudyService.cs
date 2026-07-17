using Mini_visualiseur_DICOM_web.Application.DTO;
using Mini_visualiseur_DICOM_web.Application.DTO.DicomViewer.Api.Dtos;
    namespace Mini_visualiseur_DICOM_web.Application.IServices
{
    public interface IDicomStudyService
        {
            Task<DicomStudyUploadResultDto> ImportAsync(IFormFile file, CancellationToken ct = default);
            Task<List<DicomStudyDto>> GetAllAsync(CancellationToken ct = default);
        Task<byte[]?> GetImageAsync(Guid studyId, CancellationToken ct = default);

    }
}

