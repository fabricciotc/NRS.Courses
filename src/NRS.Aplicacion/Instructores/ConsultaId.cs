using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using NRS.Persistencia.DapperConexion.Instructor;

namespace NRS.Aplicacion.Instructores
{
    public class ConsultaId
    {
        public class Ejecuta : IRequest<InstructorModel>{
            public Guid Id  {set;get;}
        }
        public class Manejador : IRequestHandler<Ejecuta, InstructorModel>
        {
            private readonly IInstructor _instructorRepositorio;
            public Manejador( IInstructor instructorRepositorio){
                _instructorRepositorio=instructorRepositorio;
            }
            public async Task<InstructorModel> Handle(Ejecuta request, CancellationToken cancellationToken)
            {
                 return await _instructorRepositorio.obtenerPorId(request.Id);  
            }
        }
}
}