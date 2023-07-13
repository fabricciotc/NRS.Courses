using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using NRS.Dominio;
using MediatR;
using Microsoft.EntityFrameworkCore;
using NRS.Persistencia;

namespace NRS.Aplicacion.Comentarios
{
    public class Consulta
    {
        public class Ejecuta : IRequest<List<Comentario>>{}
        public class Manejador : IRequestHandler<Ejecuta, List<Comentario>>
        {
            private readonly CursosOnlineDbContext _context;
            public Manejador(CursosOnlineDbContext context){
                _context=context;
            }
            public async Task<List<Comentario>> Handle(Ejecuta request, CancellationToken cancellationToken)
            {
                return await _context.Comentario.ToListAsync();
            }
        }
    }
}