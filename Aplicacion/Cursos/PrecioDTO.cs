using System;

namespace Aplicacion.Cursos
{
    public class PrecioDTO
    {
        public Guid PrecioId{set;get;}
        public decimal PrecioActual{set;get;}
        public decimal Promocion{set;get;}
        public Guid CursoId{set;get;}
    }
}