using System;
using System.Threading;
using System.Threading.Tasks;
using FluentValidation;
using MediatR;
using NRS.Persistencia.DapperConexion;
using NRS.Persistencia.DapperConexion.Instructor;

namespace NRS.Aplicacion.Instructores
{
    public class Edita
    {
        public class Ejecuta: IRequest{
            public Guid InstructorId{set;get;} 
             public string Nombre {set;get;}
            public string Apellidos{set;get;}
            public string Grado{set;get;}
        }
        public class EjecutaVali: AbstractValidator<Ejecuta>{
            public EjecutaVali(){
                RuleFor(d=>d.Nombre).NotEmpty();
                RuleFor(d=>d.Apellidos).NotEmpty();
                RuleFor(d=>d.Grado).NotEmpty();
            }
        }
        public class Manejador : IRequestHandler<Ejecuta>
        {
            private readonly IInstructor _instructorRepository;
            public Manejador(IInstructor instructorRepositorio){
                _instructorRepository=instructorRepositorio;
            }
            public async Task<Unit> Handle(Ejecuta request, CancellationToken cancellationToken)
            {
                  InstructorModel parametros = new InstructorModel{
                    InstructorId=request.InstructorId,
                    Nombre=request.Nombre,
                    Apellidos=request.Apellidos,
                    Grado=request.Grado
                };
                 var result = await _instructorRepository.Actualizar(parametros);
                 if(result>=0){
                     return Unit.Value;
                 }
                  throw new Exception("No se pudo actualizar ningun instructor");
            }
        }
    }
}