using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using NRS.Aplicacion.Comentarios;
using NRS.Dominio;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace NRS.BFF.Controllers
{
    public class ConmentarioController: MiControllerBase
    {
        [HttpPost]
        public async Task<Unit> Crear(Nuevo.Ejecuta nuevo){
            return await mediator.Send(nuevo);
        }
        [HttpGet]
        public async Task<List<Comentario>> Get(){
            return await mediator.Send(new Consulta.Ejecuta());
        }
        [HttpDelete("{id}")]
        public async Task<Unit> Eliminar(Guid id){
            return await mediator.Send(new Elimina.Ejecuta{ComentarioId = id});
        }
    }
}