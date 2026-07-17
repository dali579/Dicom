    using Microsoft.AspNetCore.Mvc;
    using Mini_visualiseur_DICOM_web.Application.IServices;

namespace Mini_visualiseur_DICOM_web.Controllers
{
    [ApiController]
        [Route("api/studies")]
        public class StudiesController : ControllerBase
        {
            private readonly IDicomStudyService _service;

            public StudiesController(IDicomStudyService service)
            {
                _service = service;
            }

            [HttpPost]
            public async Task<IActionResult> Upload(IFormFile file, CancellationToken ct)
            {
                var result = await _service.ImportAsync(file, ct);
                return StatusCode(StatusCodes.Status201Created, result);
            }
        [HttpGet]
        public async Task<IActionResult> GetAll(CancellationToken ct)
        {
            var studies = await _service.GetAllAsync(ct);
            return Ok(studies);
        }
        [HttpGet("{studyId}/image")]
        public async Task<IActionResult> GetImage(Guid studyId, CancellationToken ct)
        {
            var imageBytes = await _service.GetImageAsync(studyId, ct);

            if (imageBytes == null)
                return NotFound();

            return File(imageBytes, "image/png");
        }
    }
    
}
