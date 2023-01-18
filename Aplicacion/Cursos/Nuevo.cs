using System.Security.Cryptography.X509Certificates;
using System;
using System.Threading;
using System.Threading.Tasks;
using Dominio;
using MediatR;
using Persistencia;
using FluentValidation;
using System.Collections.Generic;

namespace Aplicacion.Cursos
{
    public class Nuevo
    {
        public class Ejecuta : IRequest{
            public string Titulo{set;get;}
            public string Descripcion{set;get;}

            public DateTime FechaDePublicacion{set;get;}
            public decimal Precio{set;get;}
            public decimal Promocion{set;get;}
            public List<Guid> ListaInstructor{set;get;}
        }
        public class EjecutaValidacion : AbstractValidator<Ejecuta>{
            public EjecutaValidacion(){
                RuleFor( x => x.Titulo).NotEmpty();
                RuleFor( x => x.Descripcion).NotEmpty();
                RuleFor( x => x.FechaDePublicacion).NotEmpty();
                RuleFor( x => x.Precio).NotEmpty();
             }   
        }
        public class Manejador : IRequestHandler<Ejecuta>
        {
            private readonly CursosOnlineDbContext _context;
            public Manejador(CursosOnlineDbContext context){
                this._context=context;
            }
            public async Task<Unit> Handle(Ejecuta request, CancellationToken cancellationToken)
            {
                Guid _cursoId = Guid.NewGuid();
                _context.Add( new Curso{
                    CursoId = _cursoId,
                    Titulo=request.Titulo, Descripcion= request.Descripcion,
                    FechaDePublicacion= request.FechaDePublicacion,
                    fechaCreacion = DateTime.UtcNow
                });
                if(request.ListaInstructor!=null){
                    foreach (var id in request.ListaInstructor)
                    {
                      var cursoInstructor= new Curso_Instructor
                      {
                          CursoId = _cursoId,
                          InstructorId = id
                      };
                      _context.Curso_Instructor.Add(cursoInstructor);
                    }
                }
                //LOGICA PARA INSERTAR PRECIO DEL CURSO
                var precioentidad= new Precio{
                    CursoId=_cursoId,
                    PrecioActual=request.Precio,
                    Promocion= request.Promocion,
                    PrecioId=Guid.NewGuid()

                };
                _context.Add(precioentidad);
                var result = await _context.SaveChangesAsync();
                return result>0?Unit.Value:throw new Exception("No se pudo insertar el curso");
            }

         
        }

    }
}