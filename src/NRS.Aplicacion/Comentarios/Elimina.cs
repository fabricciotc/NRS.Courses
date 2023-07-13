using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using NRS.Persistencia;

namespace NRS.Aplicacion.Comentarios
{
    public class Elimina
    {
         public class Ejecuta : IRequest{
            public Guid ComentarioId{set;get;}
        }
        public class Manejador : IRequestHandler<Ejecuta>
        {
            private readonly CursosOnlineDbContext _context;
            public Manejador(CursosOnlineDbContext context){
                _context=context;
            }
            public async Task<Unit> Handle(Ejecuta request, CancellationToken cancellationToken)
            {
                    var curso = await _context.Comentario.FindAsync(request.ComentarioId);
                    if(curso!=null){
                    _context.Remove(curso);
                    var result = await _context.SaveChangesAsync();
                    if(result>=0){
                        return Unit.Value;
                    }
                    }
                    throw new Exception("Comentario no encontrado");
            }
        }
    }
}