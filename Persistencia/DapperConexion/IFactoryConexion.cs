using System.Data;
namespace Persistencia.DapperConexion
{
    public interface IFactoryConexion
    {
        void CloseConection();
        IDbConnection GetConnection();
    }
}