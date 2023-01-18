using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using FluentValidation;
using MediatR;
using Persistencia.DapperConexion.Paginacion;

namespace Aplicacion.Cursos
{
    public class PaginacionCurso
    {
        public class Ejecuta : IRequest<PaginacionModel>{
            public string Titulo{set;get;}
            public int numeroPagina{set;get;}
            public int cantidadElementos{set;get;}
        }
          public class EjecutaValidacion : AbstractValidator<Ejecuta>{
            public EjecutaValidacion(){
                RuleFor( x => x.numeroPagina).NotEmpty();
                RuleFor( x => x.cantidadElementos).NotEmpty();
             }   
        }
        public class Manejador: IRequestHandler<Ejecuta, PaginacionModel>{
            private readonly IPaginacion _paginacion;
            public Manejador(IPaginacion paginacion)
            {
                _paginacion=paginacion;
            }      
            public async Task<PaginacionModel> Handle(Ejecuta request, CancellationToken cancellationToken)
            {
                var storedProcedure = "usp_obtener_curso_paginacion";
                var ordenamiento ="Titulo";
                var parametros = new Dictionary<string,object>();
                parametros.Add("NombreCurso",request.Titulo);
                return await _paginacion.devolverPaginacion(storedProcedure,request.numeroPagina,request.cantidadElementos,parametros,ordenamiento);
            }
        }
    }
}