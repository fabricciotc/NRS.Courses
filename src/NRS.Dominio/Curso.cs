using System.Collections.Generic;
using System;
using System.ComponentModel.DataAnnotations;

namespace NRS.Dominio
{
    public class Curso
    {
        [Key]
        public Guid CursoId{set;get;}
        public string Titulo{set;get;}
        public string Descripcion{set;get;}
        public DateTime FechaDePublicacion{set;get;}
        public byte[] FotoPortada{set;get;}
        public ICollection<Comentario> Comentarios{set;get;}
        public Precio Precio{set;get;}
        public ICollection<Curso_Instructor> Instructores{set;get;}
        public DateTime? fechaCreacion{set;get;}

    }
}