using System;
using System.Threading;
using System.Threading.Tasks;
using Dominio;
using FluentValidation;
using MediatR;
using Persistencia;

namespace Aplicacion.Comentarios
{
    public class Nuevo
    {
        public class Ejecuta : IRequest{
            public string Alumno{set;get;}
            public int Puntaje{set;get;}
            public string Comentario{set;get;}
            public Guid CursoId{set;get;}
        }
        public class EjecutaValidacion: AbstractValidator<Ejecuta>{
            public EjecutaValidacion(){
                RuleFor(d=>d.Alumno).NotEmpty();
                RuleFor(d=>d.CursoId).NotEmpty();
                RuleFor(d=>d.Puntaje).NotEmpty();
                RuleFor(d=>d.Comentario).NotEmpty();
            }
        }
        public class Manejador : IRequestHandler<Ejecuta>
        {
            private readonly CursosOnlineDbContext _context;
            public Manejador(CursosOnlineDbContext context){
                _context=context;
            }
            public async Task<Unit> Handle(Ejecuta request, CancellationToken cancellationToken)
            {
                var comentario = new Comentario {
                    ComentarioId = Guid.NewGuid(),
                    ComentarioTexto= request.Comentario,
                    Alumno= request.Alumno,
                    Puntaje=request.Puntaje,
                    CursoId=request.CursoId,
                    fechaCreacion=DateTime.UtcNow
                };
                _context.Add(comentario);
                var result = await _context.SaveChangesAsync();
                if(result>=0){
                    return Unit.Value;
                }
                throw new Exception("No se realizo ninguna insersion de comentario");
            }
        }
    }
}