using NRS.Aplicacion.ManejadorError;
using MediatR;
using Microsoft.EntityFrameworkCore;
using NRS.Persistencia;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace NRS.Aplicacion.Documentos
{
    public class ObtenerArchivo
    {
        public class Ejecuta : IRequest<ArchivoGenerico>
        {
            public Guid Id { get; set; }
        }
        public class Manejador : IRequestHandler<Ejecuta, ArchivoGenerico>
        {
            private readonly CursosOnlineDbContext _context;
            
            public Manejador(CursosOnlineDbContext context)
            {
                _context = context;
            }

            public async Task<ArchivoGenerico> Handle(Ejecuta request, CancellationToken cancellationToken)
            {
                var archivo = await _context.Documento.FirstOrDefaultAsync(x => x.ObjetoReferencia == request.Id);
                if(archivo == null)
                {
                    throw new ManejadorExcepcion(System.Net.HttpStatusCode.NotFound, new { mensaje = "No se encontro la imagen" });
                }
                return new ArchivoGenerico
                {
                    Data = Convert.ToBase64String(archivo.Contenido),
                    Nombre = archivo.Nombre,
                    Extension = archivo.Extension
                };
            }
        }
    }
}
