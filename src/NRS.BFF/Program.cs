using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using NRS.Dominio;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using NRS.Persistencia;

namespace NRS.BFF
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var hostServer = CreateHostBuilder(args).Build();
            //CONFIGURACION PARA LA MIGRACION
            using(var ambiente = hostServer.Services.CreateScope()){
                var services = ambiente.ServiceProvider;
                try{
                var userManager = services.GetRequiredService<UserManager<Usuario>>();
                var context = services.GetRequiredService<CursosOnlineDbContext>();
                context.Database.Migrate();
                DataPrueba.InsertarData(context,userManager).Wait();
                }
                catch(Exception ex){
                    var logging = services.GetRequiredService<ILogger<Program>>();
                    logging.LogError(ex,"Ocurrio un error en la migracion");
                }
            }
            //FIN DE CONFIGURACION DE MIGRACION
            hostServer.Run();

        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
