using System;
using Microsoft.Data.Sqlite;
using Dapper;

using PokedexDotnet.Shared.Infrastructures;
using PokedexDotnet.Shared.Util;

namespace PokedexDotnet.Shared.Usecases;

public class QueryPokemon
{
    public static Task<Pokemon[]> FetchPokemons(SqliteConnectionWrapper dbHelper)
    {
        return dbHelper.AsyncBindConnection(
            async (c) =>
            {
                var result = await c.QueryAsync("select id, name from pokemons");
                var mapped = result.OfType<IDictionary<string, object>>().Select(v =>
                {
                    return new Pokemon(
                        Convert.ToInt32(v["id"]),
                        Convert.ToString(v["name"])
                    );
                });

                return mapped.ToArray();
            },
            Task.FromException<Pokemon[]>(new Exception("Cannot fetch pokemons"))
        );
    }

    public static Task<Pokemon[]> FetchPokemons(SqliteConnectionWrapper dbHelper, string query)
    {
        return dbHelper.AsyncBindConnection(
            async (c) =>
            {
                using var command = c.CreateCommand();
                command.CommandText = "select id, name from pokemons where id = @MAYBEID or name like @MAYBENAME";
                var maybeId = -1;
                if (!int.TryParse(query, out maybeId))
                {
                    maybeId = -1;
                }
                command.Parameters.Add(new SqliteParameter { SqliteType = SqliteType.Integer, Value = maybeId, ParameterName = "@MAYBEID" });
                command.Parameters.Add(new SqliteParameter { SqliteType = SqliteType.Text, Value = $"%{query}%", ParameterName = "@MAYBENAME", DbType = System.Data.DbType.String });
                using var reader = await command.ExecuteReaderAsync();
                return reader.ToEnumerable().Select(v =>
                {
                    var id = Convert.ToInt32(v["id"]);
                    var name = (string)v["name"];
                    return new Pokemon(id, name);
                }).ToArray();
            },
            Task.FromException<Pokemon[]>(new Exception("Cannot fetch pokemons"))
        );
    }
}
