using System;
using System.Data;
using Microsoft.Data.Sqlite;
using Dapper;

namespace PokedexDotnet.Shared.Infrastructures;

public class SqliteConnectionWrapper(Func<string> getSqliteConnectionString)
{
    private SqliteConnection? connection;

    public async Task<T> AsyncBindConnection<T>(Func<SqliteConnection, Task<T>> fn, Task<T> onFailConnection)
    {
        if (!await OpenSqlite())
        {
            return await onFailConnection;
        }
        try
        {
            if (connection == null)
            {
                throw new Exception("Connection is null");
            }
            var result = await fn(connection);
            await connection.CloseAsync();
            return result;
        }
        catch (Exception e)
        {
            return await Task.FromException<T>(e);
        }
    }

    private async Task<bool> OpenSqlite()
    {
        if (!Initialize())
        {
            return false;
        }
        if (connection == null)
        {
            return false;
        }
        if (connection.State != System.Data.ConnectionState.Open)
        {
            await connection.OpenAsync();
        }
        return true;
    }

    private bool Initialize()
    {
        if (connection == null)
        {
            try
            {
                var conn = new SqliteConnection(getSqliteConnectionString());
                connection = conn;
                SqlMapper.AddTypeHandler(typeof(int), new IntHandler());
            }
            catch
            {
                return false;
            }
        }
        return true;
    }

}

// https://learn.microsoft.com/en-us/dotnet/standard/data/sqlite/dapper-limitations#data-types
internal abstract class SqliteTypeHandler<T> : SqlMapper.TypeHandler<T>
{
    // Parameters are converted by Microsoft.Data.Sqlite
    public override void SetValue(IDbDataParameter parameter, T value)
        => parameter.Value = value;
}

internal class IntHandler : SqliteTypeHandler<int>
{
    public override int Parse(object value)
        => Convert.ToInt32(value);
}