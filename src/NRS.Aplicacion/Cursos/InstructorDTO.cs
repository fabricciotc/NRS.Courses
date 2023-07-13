using System;

namespace NRS.Aplicacion.Cursos
{
    public class InstructorDTO
    {
        public Guid InstructorId{set;get;}
        public string Nombre{set;get;}
        public string Apellidos{set;get;}
        public string Grado{set;get;}
        public byte[] FotoPerfil {set;get;}
        public DateTime? fechaCreacion{set;get;}
    }
}