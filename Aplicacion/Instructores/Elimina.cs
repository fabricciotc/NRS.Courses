using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistencia.DapperConexion.Instructor;

namespace Aplicacion.Instructores
{
    public class Elimina
    {
        public class Ejecuta : IRequest{
            public Guid InstructorId {set;get;}
        }
        public class Manejador : IRequestHandler<Ejecuta>
        {
            private readonly IInstructor _instructorRepositorio;
            public Manejador(IInstructor instructorRepositorio){
                _instructorRepositorio=instructorRepositorio;
            }
            public async Task<Unit> Handle(Ejecuta request, CancellationToken cancellationToken)
            {
                var result = await _instructorRepositorio.Eliminar(request.InstructorId);
                if(result>=0){
                    return Unit.Value;
                }
                throw new Exception("No se elimino a ningun instructor");
            }
        }
    }
}