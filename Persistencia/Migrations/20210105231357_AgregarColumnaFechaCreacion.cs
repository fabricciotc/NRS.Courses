using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistencia.Migrations
{
    public partial class AgregarColumnaFechaCreacion : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "fechaCreacion",
                table: "Instructor",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "fechaCreacion",
                table: "Curso",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "fechaCreacion",
                table: "Comentario",
                type: "datetime2",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "fechaCreacion",
                table: "Instructor");

            migrationBuilder.DropColumn(
                name: "fechaCreacion",
                table: "Curso");

            migrationBuilder.DropColumn(
                name: "fechaCreacion",
                table: "Comentario");
        }
    }
}
