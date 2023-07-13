using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NRS.Dominio
{
    public class Precio
    {
        [Key]
        public Guid PrecioId{set;get;}
        [Column(TypeName="decimal(18,4)")]
        public decimal PrecioActual{set;get;}
        [Column(TypeName="decimal(18,4)")]
        public decimal Promocion{set;get;}
        public Guid CursoId{set;get;}
        public Curso Curso{set;get;}
    }
}