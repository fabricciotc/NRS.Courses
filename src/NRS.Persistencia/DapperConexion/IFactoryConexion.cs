using System.Data;
namespace NRS.Persistencia.DapperConexion
{
    public interface IFactoryConexion
    {
        void CloseConection();
        IDbConnection GetConnection();
    }
}