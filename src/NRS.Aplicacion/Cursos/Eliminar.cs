using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Aplicacion.ManejadorError;
using Dominio;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistencia;

namespace Aplicacion.Cursos
{
    public class Eliminar
    {
        public class Ejecutar : IRequest{
            public Guid CursoId {set;get;}
        }
        
     
        public class Manejador : IRequestHandler<Ejecutar>
        {
            private readonly CursosOnlineDbContext _context;
            public Manejador(CursosOnlineDbContext context){
                this._context=context;
            }
            public async Task<Unit> Handle(Ejecutar request, CancellationToken cancellationToken)
            {
                  var instructoresDB = await _context.Curso_Instructor.Where(x=> x.CursoId == request.CursoId).ToListAsync();
                  _context.Curso_Instructor.RemoveRange(instructoresDB);
                var comentariosDB = await _context.Comentario.Where(d=> d.CursoId==request.CursoId).ToListAsync();
                _context.Comentario.RemoveRange(comentariosDB);
                var precioDB= await _context.Precio.Where(d=>d.CursoId== request.CursoId).FirstOrDefaultAsync();
                if(precioDB!=null){
                _context.Precio.Remove(precioDB);
                }
                 Curso curso = await _context.Curso.FindAsync(request.CursoId);
                    if(curso==null){
                        // throw new Exception("Curso no encontrado");
                        throw new ManejadorExcepcion(System.Net.HttpStatusCode.NotFound,new {curso="No se encontro el Curso"});
                    }
                _context.Remove(curso);
                var result=await _context.SaveChangesAsync();
                return result>0?Unit.Value:throw new System.NotImplementedException();
            }
        }
    }
}