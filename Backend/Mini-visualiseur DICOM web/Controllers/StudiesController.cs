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
            try
            {
                var result = await _service.ImportAsync(file, ct);

                return StatusCode(StatusCodes.Status201Created, result);
            }
            catch (InvalidOperationException ex)
            {
                return Conflict(new
                {
                    message = ex.Message
                });
            }
        }
        [HttpGet]
        public async Task<IActionResult> GetAll(CancellationToken ct)
        {
            var studies = await _service.GetAllAsync(ct);
            return Ok(studies);
        }
        [HttpGet("{id}/image")]
        public async Task<IActionResult> GetImage(
      Guid id,
      [FromQuery] double? ww,
      [FromQuery] double? wl)
        {
            var image = await _service.GetImageAsync(id, ww, wl);

            if (image == null)
                return NotFound();

            return File(image, "image/png");
        }
    }
    
}
