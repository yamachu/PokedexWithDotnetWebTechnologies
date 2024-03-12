using System;
using Microsoft.Data.Sqlite;
using Dapper;

namespace PokedexDotnet.Shared.Infrastructures;

public class DisposableSqliteConnection(Func<string> getSqliteConnectionString) : IAsyncDisposable
{
    private SqliteConnection? connection;

    public async Task<SqliteConnection?> Open()
    {
        try
        {
            var conn = new SqliteConnection(getSqliteConnectionString());
            connection = conn;
            SqlMapper.AddTypeHandler(typeof(int), new IntHandler());
            if (connection.State != System.Data.ConnectionState.Open)
            {
                await connection.OpenAsync();
            }

            return connection;
        }
        catch
        {
            connection = null;
            return null;
        }
    }

    public async ValueTask DisposeAsync()
    {
        if (connection == null)
        {
            return;
        }
        await connection.CloseAsync();
        connection = null;
    }
}
