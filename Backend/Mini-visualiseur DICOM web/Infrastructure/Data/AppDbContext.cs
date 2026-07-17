using Microsoft.EntityFrameworkCore;
using Mini_visualiseur_DICOM_web.Domain;

namespace Mini_visualiseur_DICOM_web.Infrastructure.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }
        public DbSet<DicomStudy> Studies => Set<DicomStudy>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);
        }
    }
}