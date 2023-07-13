using Microsoft.AspNetCore.Identity;

namespace NRS.Dominio
{
    public class Usuario : IdentityUser
    {
        public string NombreCompleto{set;get;}
        
    }
}