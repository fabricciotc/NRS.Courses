using System.Collections.Generic;
using NRS.Dominio;

namespace NRS.Aplicacion.Contratos
{
    public interface IJwtGenerador
    {
        string CrearToken(Usuario usuario, List<string> roles);
    }
}