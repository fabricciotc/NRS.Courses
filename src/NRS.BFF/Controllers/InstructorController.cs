using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using NRS.Aplicacion.Instructores;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NRS.Persistencia.DapperConexion.Instructor;

namespace NRS.BFF.Controllers
{
    public class InstructorController : MiControllerBase
    {
        [HttpGet]
        [Authorize(Roles="Admin")]
        public async Task<ActionResult<List<InstructorModel>>> ObtenerInstructores(){
            return await mediator.Send(new Consulta.Lista());
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<InstructorModel>> ObtenerPorId(Guid Id){
            return await mediator.Send(new ConsultaId.Ejecuta{Id=Id});
        }
        [HttpPost]
        public async Task<ActionResult<Unit>> Crear(Nuevo.Ejecuta model){
            return await mediator.Send(model);
        }    
        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Editar(Guid id,Edita.Ejecuta model){
            model.InstructorId=id;
            return await mediator.Send(model);
        }      
        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Eliminar(Guid id){
            return await mediator.Send(new Elimina.Ejecuta{InstructorId=id});
        } 
    }
}