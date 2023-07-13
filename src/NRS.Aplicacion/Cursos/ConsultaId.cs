using System;
using System.Threading;
using System.Threading.Tasks;
using NRS.Aplicacion.ManejadorError;
using AutoMapper;
using NRS.Dominio;
using MediatR;
using Microsoft.EntityFrameworkCore;
using NRS.Persistencia;

namespace NRS.Aplicacion.Cursos
{
    public class ConsultaId
    {
       public class CursoUnico: IRequest<CursoDTO> {
           public Guid Id{set;get;}
       }
        public class Manejador : IRequestHandler<CursoUnico, CursoDTO>
        {
            private readonly CursosOnlineDbContext _context;
            private readonly IMapper _mapper;
            public Manejador(CursosOnlineDbContext context, IMapper mapper){
                this._context=context;
                this._mapper=mapper;
            }
            public async Task<CursoDTO> Handle(CursoUnico request, CancellationToken cancellationToken)
            {
                Curso curso = await _context.Curso
                .Include(x=>x.Comentarios).
                Include(x=>x.Precio)
                .Include( x=> x.Instructores).ThenInclude( x=>x.Instructor).FirstOrDefaultAsync( x=> x.CursoId == request.Id);
                if(curso==null){
                        throw new ManejadorExcepcion(System.Net.HttpStatusCode.NotFound,new {curso="No se encontro el Curso"});
                }
                return _mapper.Map<Curso,CursoDTO>(curso);
            }
        }    
    }
}