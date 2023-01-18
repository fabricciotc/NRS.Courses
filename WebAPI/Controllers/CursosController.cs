using System;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Dominio;
using Aplicacion.Cursos;
using Microsoft.AspNetCore.Authorization;
using Persistencia.DapperConexion.Paginacion;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CursosController : MiControllerBase
    {
        
        [HttpGet]
        public async Task<ActionResult<List<CursoDTO>>> Get(){
            return await mediator.Send(new Consulta.ListaCursos());
        }
        [HttpPost]
        public async Task<ActionResult<Unit>> Post(Nuevo.Ejecuta data){
            return await mediator.Send(data);
        }
        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Update(Guid id,Editar.Ejecutar data){
            data.CursoId=id;
            return await mediator.Send(data);
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(Guid id){
            return await mediator.Send(new Eliminar.Ejecutar{CursoId=id});
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<CursoDTO>> Detalle(Guid id){
            return await mediator.Send(new ConsultaId.CursoUnico{Id=id});
        }
        [HttpPost("report")]
        public async Task<ActionResult<PaginacionModel>> Report(PaginacionCurso.Ejecuta data){
            return await mediator.Send(data);
        }
    }
}