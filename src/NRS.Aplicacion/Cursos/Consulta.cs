using System.Collections.Generic;
using MediatR;
using NRS.Dominio;
using Microsoft.EntityFrameworkCore;
using NRS.Persistencia;
using System.Threading.Tasks;
using System.Threading;
using AutoMapper;

namespace NRS.Aplicacion.Cursos
{
    public class Consulta
    {
        public class ListaCursos: IRequest<List<CursoDTO>> {}
        public class Manejador : IRequestHandler<ListaCursos, List<CursoDTO>>
        {
            private readonly CursosOnlineDbContext _context;
            private readonly IMapper _mapper;
            public Manejador(CursosOnlineDbContext context, IMapper mapper){
                this._context=context;
                this._mapper = mapper;
            }
            public async Task<List<CursoDTO>> Handle(ListaCursos request, CancellationToken cancellationToken)
            {
                var cursos = await _context.Curso
                .Include(x=>x.Comentarios).
                Include(x=>x.Precio)
                .Include(x=> x.Instructores)
                .ThenInclude(x=>x.Instructor)
                .ToListAsync();
                var cursosDTO = _mapper.Map<List<Curso>,List<CursoDTO>>(cursos);
                return cursosDTO;
            }
        }
    }
}