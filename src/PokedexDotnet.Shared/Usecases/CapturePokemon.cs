using System;
using Microsoft.Data.Sqlite;
using Dapper;

using PokedexDotnet.Shared.Infrastructures;

namespace PokedexDotnet.Shared.Usecases;

public class CapturePokemon
{
    public static async Task<int> Migration(SqliteConnection c)
    {
        // TODO: move to trainer_db_migration.sql
        var result = await c.ExecuteAsync("CREATE TABLE IF NOT EXISTS captured_pokemons (id integer unique);");
        return result;
    }

    public static Task<int[]> FetchCapturedPokemons(SqliteConnectionWrapper dbHelper)
    {
        return dbHelper.AsyncBindConnection(
            FetchCapturedPokemons,
            Task.FromException<int[]>(new Exception("Cannot fetch captured pokemons"))
        );
    }

    public static async Task<int[]> FetchCapturedPokemons(SqliteConnection connection)
    {
        var result = await connection.QueryAsync<int>("select id from captured_pokemons");
        return result.ToArray();
    }

    public static Task<int /* affected rows */> PutCapturedPokemon(SqliteConnectionWrapper dbHelper, int id)
    {
        return dbHelper.AsyncBindConnection(
            (c) => PutCapturedPokemon(c, id),
            Task.FromException<int>(new Exception("Cannot put captured pokemons"))
        );
    }

    public static async Task<int /* affected rows */> PutCapturedPokemon(SqliteConnection connection, int id)
    {
        using var command = connection.CreateCommand();
        command.CommandText = "insert or ignore into captured_pokemons (id) values (@ID)";
        command.Parameters.Add(new SqliteParameter { SqliteType = SqliteType.Integer, Value = id, ParameterName = "@ID" });
        var result = await command.ExecuteNonQueryAsync();
        return result;
    }

    public static Task<int /* affected rows */> DeleteCapturedPokemon(SqliteConnectionWrapper dbHelper, int id)
    {
        return dbHelper.AsyncBindConnection(
            (c) => DeleteCapturedPokemon(c, id),
            Task.FromException<int>(new Exception("Cannot delete captured pokemons"))
        );
    }

    public static async Task<int /* affected rows */> DeleteCapturedPokemon(SqliteConnection connection, int id)
    {
        using var command = connection.CreateCommand();
        command.CommandText = "delete from captured_pokemons where id = @ID";
        command.Parameters.Add(new SqliteParameter { SqliteType = SqliteType.Integer, Value = id, ParameterName = "@ID" });
        var result = await command.ExecuteNonQueryAsync();
        return result;
    }
}