namespace Mini_visualiseur_DICOM_web.Domain
{
    public class DicomStudy
    {
        public Guid Id { get; set; }

        public string? PatientId { get; set; }
        public string? PatientName { get; set; }
        public string? Modality { get; set; }
        public DateTime? StudyDate { get; set; }
        public int? Width { get; set; }
        public int? Height { get; set; }

        public string OriginalFileName { get; set; } = null!;
        public string StoredFilePath { get; set; } = null!;
        public long FileSizeBytes { get; set; }

        public DateTime UploadedAt { get; set; } = DateTime.UtcNow;
    }
}
