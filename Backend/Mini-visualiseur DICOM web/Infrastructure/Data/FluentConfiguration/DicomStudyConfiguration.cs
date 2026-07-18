namespace Mini_visualiseur_DICOM_web.Infrastructure.Data.FluentConfiguration
{
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Metadata.Builders;
    using Mini_visualiseur_DICOM_web.Domain;
    using System.Reflection.Emit;

    namespace DicomViewer.Api.Data.Configurations
    {
        public class DicomStudyConfiguration : IEntityTypeConfiguration<DicomStudy>
        {
            public void Configure(EntityTypeBuilder<DicomStudy> builder)
            {
                builder.ToTable("Studies");

                builder.HasKey(s => s.Id);

                builder.Property(s => s.Id)
                    .ValueGeneratedOnAdd();

                builder.Property(s => s.PatientId)
                    .HasMaxLength(64);

                builder.Property(s => s.PatientName)
                    .HasMaxLength(200);

                builder.Property(s => s.Modality)
                    .HasMaxLength(16);

                builder.Property(s => s.StudyDate);

                builder.Property(s => s.Width);
                builder.Property(s => s.Height);

                builder.Property(s => s.OriginalFileName)
                    .IsRequired()
                    .HasMaxLength(260);

                builder.Property(s => s.StoredFilePath)
                    .IsRequired()
                    .HasMaxLength(500);

                builder.Property(s => s.FileSizeBytes)
                    .IsRequired();

                builder.Property(s => s.UploadedAt)
                    .IsRequired();

                builder.HasIndex(s => s.PatientId);
                builder
      .HasIndex(x => x.StudyInstanceUid)
      .IsUnique();
            }
        }
    }
}
