using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace NRS.Dominio
{
    public class Instructor
    {
        [Key]
        public Guid InstructorId{set;get;}
        public string Nombre{set;get;}
        public string Apellidos{set;get;}
        public string Grado{set;get;}
        public byte[] FotoPerfil {set;get;}
        public ICollection<Curso_Instructor> Cursos{set;get;}
        public DateTime? fechaCreacion{set;get;}

    }
}