using System.Linq;
using System.Threading.Tasks;
using NRS.Dominio;
using Microsoft.AspNetCore.Identity;

namespace NRS.Persistencia
{
    public class DataPrueba
    {
        public static async Task InsertarData(CursosOnlineDbContext context,UserManager<Usuario> userManager){
            if(!userManager.Users.Any()){
                var usuario = new Usuario(){
                    NombreCompleto = "Fabriccio Tornero",
                    UserName = "fab.tornero",
                    Email = "fabriccio.tcortes@gmail.com"
                };
                await userManager.CreateAsync(usuario,"Password123!");
            }
        }
    }
}