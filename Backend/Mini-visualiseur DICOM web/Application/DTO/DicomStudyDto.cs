namespace Mini_visualiseur_DICOM_web.Application.DTO
{
        public record DicomStudyDto(
            Guid Id,
            string? PatientId,
            string? PatientName,
            string? Modality,
            DateTime? StudyDate,
            int? Width,
            int? Height,
            string OriginalFileName,
            long FileSizeBytes,
            DateTime UploadedAt
        );
    
}
