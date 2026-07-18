using Mini_visualiseur_DICOM_web.Domain;

namespace Mini_visualiseur_DICOM_web.Infrastructure.IRepository
{
        public interface IDicomStudyRepository
        {
            Task<DicomStudy> AddAsync(DicomStudy study, CancellationToken ct = default);
            Task<List<DicomStudy>> GetAllAsync(CancellationToken ct = default);
        Task<DicomStudy?> GetByIdAsync(Guid id, CancellationToken ct = default);
        Task<bool> ExistsByStudyInstanceUidAsync(
    string studyInstanceUid,
    CancellationToken ct = default);

    }
}
