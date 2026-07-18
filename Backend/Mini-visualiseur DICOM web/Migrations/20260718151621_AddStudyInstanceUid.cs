using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Mini_visualiseur_DICOM_web.Migrations
{
    /// <inheritdoc />
    public partial class AddStudyInstanceUid : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "StudyInstanceUid",
                table: "Studies",
                type: "varchar(255)",
                nullable: false,
                defaultValue: "")
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_Studies_StudyInstanceUid",
                table: "Studies",
                column: "StudyInstanceUid",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Studies_StudyInstanceUid",
                table: "Studies");

            migrationBuilder.DropColumn(
                name: "StudyInstanceUid",
                table: "Studies");
        }
    }
}
