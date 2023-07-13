using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using NRS.Persistencia.DapperConexion.Instructor;
using System.Linq;

namespace NRS.Aplicacion.Instructores
{
    public class Consulta
    {
        public class Lista : IRequest<List<InstructorModel>>{}
        public class Manejador : IRequestHandler<Lista, List<InstructorModel>>
        {
            private readonly IInstructor _instructorRepository;
            public Manejador(IInstructor instructorRepository){
                _instructorRepository=instructorRepository;
            }
            public async Task<List<InstructorModel>> Handle(Lista request, CancellationToken cancellationToken)
            {
                var result = await _instructorRepository.obtenerLista();
                return result.ToList();
            }
        }
    }
}