using System;
using System.Threading;
using System.Threading.Tasks;
using FluentValidation;
using MediatR;
using NRS.Persistencia.DapperConexion.Instructor;

namespace NRS.Aplicacion.Instructores
{
    public class Nuevo
    {
        public class Ejecuta : IRequest{
            public string Nombre {set;get;}
            public string Apellidos{set;get;}
            public string Grado{set;get;}
        }
        public class EjecutaValida : AbstractValidator<Ejecuta>{
            public EjecutaValida(){
                RuleFor(x=>x.Apellidos).NotEmpty();
                RuleFor(x=>x.Nombre).NotEmpty();
                RuleFor(x=>x.Grado).NotEmpty();
            }
        }
        public class Manejador : IRequestHandler<Ejecuta>
        {
            private readonly IInstructor _instructorRepository;
            public Manejador(IInstructor instructorRepository){
                _instructorRepository=instructorRepository;
            }
            public async Task<Unit> Handle(Ejecuta request, CancellationToken cancellationToken)
            {
                InstructorModel parametros = new InstructorModel{
                    Nombre=request.Nombre,
                    Apellidos=request.Apellidos,
                    Grado=request.Grado
                };
                var result = await _instructorRepository.Nuevo(parametros);
                if(result>=0){
                    return Unit.Value;
                }
                throw new Exception("No se pudo insertar el instructor");
            }
        }
    }
}