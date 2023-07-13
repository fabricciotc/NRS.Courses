using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using NRS.Aplicacion.Contratos;
using NRS.Dominio;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using NRS.Persistencia;

namespace NRS.Aplicacion.Seguridad
{
    public class UsuarioActulizar
    {
        public class Ejecuta : IRequest<UsuarioData>{
                public string NombreCompleto {set;get;}
                public string Email {set;get;}
                public string Password {set;get;}
                public string Username {set;get;}   
                public ImagenGeneral ImagenPerfil { get; set;}
        }
        public class EjecutaValidador: AbstractValidator<Ejecuta>{
            public EjecutaValidador(){
                RuleFor(x=>x.Email).EmailAddress().NotEmpty();
                RuleFor(x=>x.Password).NotEmpty();
                RuleFor(x=>x.NombreCompleto).NotEmpty();
                RuleFor(x=>x.Username).NotEmpty();
            }
        }
        public class Manejador : IRequestHandler<Ejecuta, UsuarioData>
        {
            private readonly CursosOnlineDbContext _context;
            private readonly UserManager<Usuario> _userManager;
            private readonly IJwtGenerador _jwtGenerador;

            public Manejador(UserManager<Usuario> userManager,CursosOnlineDbContext context,IJwtGenerador jwtGenerador){
                _userManager=userManager;
                _context=context;
                _jwtGenerador=jwtGenerador;
            }
            
            public async Task<UsuarioData> Handle(Ejecuta request, CancellationToken cancellationToken)
            {
                var usuarioIden= await _userManager.FindByNameAsync(request.Username);
                if(usuarioIden==null){
                    throw new System.Exception("Usuario por editar no encontrado");
                }
                var passwordresult = await _userManager.CheckPasswordAsync(usuarioIden,request.Password);
                if(!passwordresult){
                    throw new System.Exception("La clave ingresada no concuerda con la del usuario");
                }
                var resultado = await _context.Users.Where(x=>x.Email==request.Email&&x.UserName!=request.Username).AnyAsync();
                if(resultado){
                    throw new System.Exception("No se puede usar ese email, porque ya se encuentra en uso");
                }
                
                if (request.ImagenPerfil != null) { 
                var resuladoImagen = await _context.Documento.Where(documento => documento.ObjetoReferencia == new Guid(usuarioIden.Id)).FirstOrDefaultAsync();
                    if (resuladoImagen == null)
                    {
                        var imagen = new Documento
                        {
                            Contenido = System.Convert.FromBase64String(request.ImagenPerfil.Data),
                            Nombre = request.ImagenPerfil.Nombre,
                            Extension = request.ImagenPerfil.Extension,
                            ObjetoReferencia = new Guid(usuarioIden.Id),
                            DocumentoId = Guid.NewGuid(),
                            FechaCreacion = DateTime.UtcNow
                        };
                        _context.Documento.Add(imagen);
                    }
                    else
                    {
                        resuladoImagen.Contenido = System.Convert.FromBase64String(request.ImagenPerfil.Data);
                        resuladoImagen.Nombre = request.ImagenPerfil.Nombre;
                        resuladoImagen.Extension = request.ImagenPerfil.Extension;
                    }
                }
                var imagenPerfil = await _context.Documento.FirstOrDefaultAsync(x => x.ObjetoReferencia == new Guid(usuarioIden.Id));
                usuarioIden.NombreCompleto= request.NombreCompleto;
                usuarioIden.Email=request.Email;
                var updated = await _userManager.UpdateAsync(usuarioIden);
                if(updated.Succeeded){
                var roles= await _userManager.GetRolesAsync(usuarioIden);

                var usuarioResponse = new UsuarioData{
                    NombreCompleto = usuarioIden.NombreCompleto,
                    Username = usuarioIden.UserName,
                    Email = usuarioIden.Email,
                    Token = _jwtGenerador.CrearToken(usuarioIden, roles.ToList())
                };
                    if (imagenPerfil != null)
                    {
                        var imagenCliente = new ImagenGeneral
                        {
                            Data = Convert.ToBase64String(imagenPerfil.Contenido),
                            Nombre = imagenPerfil.Nombre,
                            Extension = imagenPerfil.Extension
                        };
                        usuarioResponse.ImagenPerfil = imagenCliente;
                    }
                    return usuarioResponse;
                }
                throw new System.Exception("No se pudo actualizar la información de esta usuario");
            }
        }
    }
}