using System;
using System.Collections.Generic;

namespace NRS.Aplicacion.Cursos
{
    public class CursoDTO
    {
        public Guid CursoId{set;get;}
        public string Titulo{set;get;}
        public string Descripcion{set;get;}
        public DateTime FechaDePublicacion{set;get;}
        public byte[] FotoPortada{set;get;}
        public ICollection<InstructorDTO> Instructores{set;get;}
        public PrecioDTO Precio{set;get;}
        public ICollection<ComentarioDTO> Comentarios {set;get;}
        public DateTime? fechaCreacion{set;get;}
    }
}