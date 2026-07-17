using Microsoft.EntityFrameworkCore;
using Mini_visualiseur_DICOM_web.Application.IServices;
using Mini_visualiseur_DICOM_web.Application.Services;
using Mini_visualiseur_DICOM_web.Infrastructure.Data;
using Mini_visualiseur_DICOM_web.Infrastructure.IRepository;
using Mini_visualiseur_DICOM_web.Infrastructure.Repository;
using FellowOakDicom;
using FellowOakDicom.Imaging;
var builder = WebApplication.CreateBuilder(args);

new DicomSetupBuilder()
    .RegisterServices(s =>
    {
        s.AddImageManager<ImageSharpImageManager>();
    })
    .Build();
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
var cs = builder.Configuration.GetConnectionString("DefaultConnection");
if (string.IsNullOrWhiteSpace(cs))
    throw new InvalidOperationException("Connection string 'DefaultConnection' is missing.");

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(cs, ServerVersion.AutoDetect(cs))
);

builder.Services.AddScoped<IDicomStudyRepository, DicomStudyRepository>();
builder.Services.AddScoped<IDicomStudyService, DicomStudyService>();
var app = builder.Build();
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider
        .GetRequiredService<AppDbContext>();

    db.Database.Migrate();
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
