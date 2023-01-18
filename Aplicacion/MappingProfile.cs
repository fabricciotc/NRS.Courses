using System.Linq;
using Aplicacion.Cursos;
using AutoMapper;
using Dominio;

namespace Aplicacion
{
    public class MappingProfile : Profile
    {
        public MappingProfile(){
            CreateMap<Curso,CursoDTO>()
            .ForMember(x=> x.Instructores,
            y=>y.MapFrom(z=>z.Instructores.Select( a=> a.Instructor)
            .ToList()))
            .ForMember(x=>x.Comentarios, y=> y.MapFrom(z=> z.Comentarios))
            .ForMember(x=> x.Precio, y=> y.MapFrom(z=>z.Precio));

            CreateMap<Curso_Instructor,Curso_InstructorDTO>();
            CreateMap<Instructor,InstructorDTO>();
            CreateMap<Comentario,ComentarioDTO>();
            CreateMap<Precio,PrecioDTO>();
        }
    }
}