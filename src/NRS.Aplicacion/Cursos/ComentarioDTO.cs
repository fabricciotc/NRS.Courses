using System;

namespace NRS.Aplicacion.Cursos
{
    public class ComentarioDTO
    {
        public Guid ComentarioId{set;get;}
        public string Alumno{set;get;}
        public int Puntaje{set;get;}
        public string ComentarioTexto{set;get;}
        public Guid CursoId{set;get;}
        public DateTime? fechaCreacion{set;get;}
    }
}