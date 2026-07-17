    using Mini_visualiseur_DICOM_web.Domain;
    using Mini_visualiseur_DICOM_web.Infrastructure.Data;
using Mini_visualiseur_DICOM_web.Infrastructure.IRepository;
using Microsoft.EntityFrameworkCore;
namespace Mini_visualiseur_DICOM_web.Infrastructure.Repository
{
    public class DicomStudyRepository : IDicomStudyRepository
    {
            private readonly AppDbContext _context;

            public DicomStudyRepository(AppDbContext context)
            {
                _context = context;
            }

            public async Task<DicomStudy> AddAsync(DicomStudy study, CancellationToken ct = default)
            {
                _context.Studies.Add(study);
                await _context.SaveChangesAsync(ct);
                return study;
            }
        public async Task<List<DicomStudy>> GetAllAsync(CancellationToken ct = default)
        {
            return await _context.Studies
                .AsNoTracking()
                .OrderByDescending(s => s.UploadedAt)
                .ToListAsync(ct);
        }
        public async Task<DicomStudy?> GetByIdAsync(Guid id, CancellationToken ct = default)
        {
            return await _context.Studies
                .FirstOrDefaultAsync(x => x.Id == id, ct);
        }
    }
    }

