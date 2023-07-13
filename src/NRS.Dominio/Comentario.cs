using System;
using System.ComponentModel.DataAnnotations;

namespace NRS.Dominio
{
    public class Comentario
    {
        [Key]
        public Guid ComentarioId{set;get;}
        public string Alumno{set;get;}
        public int Puntaje{set;get;}
        public string ComentarioTexto{set;get;}
        public Guid CursoId{set;get;}
        public Curso Curso{set;get;}
        public DateTime? fechaCreacion{set;get;}
    }
}