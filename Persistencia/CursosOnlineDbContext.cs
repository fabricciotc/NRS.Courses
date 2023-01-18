using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Dominio;
namespace Persistencia
{
    public class CursosOnlineDbContext : IdentityDbContext<Usuario>
    {
        public CursosOnlineDbContext(DbContextOptions options):base (options){

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder){
            //ARCHIVO DE MIGRACION
            base.OnModelCreating(modelBuilder);
            //CREACION DE 2 LLAVES FORANEAS COMO PRIMARIA
            modelBuilder.Entity<Dominio.Curso_Instructor>().HasKey(ci=>new {ci.CursoId,ci.InstructorId} );
        }
        public DbSet<Comentario> Comentario{set;get;}
        public DbSet<Curso> Curso{set;get;}
        public DbSet<Curso_Instructor> Curso_Instructor{set;get;}
        public DbSet<Instructor> Instructor{set;get;}
        public DbSet<Precio> Precio {set;get;}
        public DbSet<Usuario> Usuario {set;get;}
    }
}