using System.Collections.Generic;
using System;
using System.Threading;
using System.Threading.Tasks;
using NRS.Aplicacion.ManejadorError;
using NRS.Dominio;
using FluentValidation;
using MediatR;
using NRS.Persistencia;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace NRS.Aplicacion.Cursos
{
    public class Editar
    {
        public class Ejecutar : IRequest{
            public Guid CursoId{set;get;}
            public string Titulo{set;get;}
            public string Descripcion{set;get;}
            public DateTime? FechaDePublicacion{set;get;}
            public List<Guid> Instructores {set;get;}
            public decimal? Precio{set;get;}
            public decimal? Promocion{set;get;}
        }
        public class Manejador : IRequestHandler<Ejecutar>
        {
            private readonly CursosOnlineDbContext _context;
            public Manejador(CursosOnlineDbContext context)
            {
                this._context=context;
            }


            public async Task<Unit> Handle(Ejecutar request, CancellationToken cancellationToken)
            {
                Curso curso = await _context.Curso.FindAsync(request.CursoId);
                if(curso==null){
                        throw new ManejadorExcepcion(System.Net.HttpStatusCode.NotFound,new {curso="No se encontro el Curso"});
                }
                curso.Titulo= request.Titulo ?? curso.Titulo;
                curso.Descripcion= request.Descripcion ?? curso.Descripcion;
                curso.FechaDePublicacion = request.FechaDePublicacion ?? curso.FechaDePublicacion;
                curso.fechaCreacion= DateTime.UtcNow;
                
                // Actualizar Precios
                var precio = await _context.Precio.Where(d=> d.CursoId == curso.CursoId).FirstOrDefaultAsync();
                if(precio!=null){
                    precio.Promocion = request.Promocion ?? precio.Promocion;
                    precio.PrecioActual = request.Precio ?? precio.PrecioActual;
                }
                else{
                    await _context.AddAsync(new Precio{
                        CursoId=curso.CursoId,
                        PrecioActual=request.Precio??0,
                        Promocion= request.Promocion??0,
                        PrecioId=Guid.NewGuid()
                    });
                }


                if(request.Instructores!=null){
                    if(request.Instructores.Count>0){
                        /*Eliminar los instrucotres actuales del Curso*/
                        var instructoresDB = await _context.Curso_Instructor.Where(x=> x.CursoId == request.CursoId).ToListAsync();
                        _context.Curso_Instructor.RemoveRange(instructoresDB);
                        /*Fin del Proceso*/

                        /*Añadiendo nuevos Instructores*/
                        foreach (var id in request.Instructores)
                        {
                            var nuevoCurso= new Curso_Instructor{
                                CursoId = request.CursoId,
                                InstructorId = id
                            };
                            _context.Curso_Instructor.Add(nuevoCurso);
                        }
                    }
                }
                var result= await _context.SaveChangesAsync();
                return result>0?Unit.Value:throw new Exception("Curso no actulizado");
            }
        }
    }
}