using System;
namespace Dominio
{
    public class Curso_Instructor
    {
        public Guid CursoId{set;get;}
        public Curso Curso{set;get;}
        public Guid InstructorId{set;get;}
        public Instructor Instructor {set;get;}
    }
}