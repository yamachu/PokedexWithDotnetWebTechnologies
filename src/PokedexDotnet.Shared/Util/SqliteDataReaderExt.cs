using Microsoft.Data.Sqlite;

namespace PokedexDotnet.Shared.Util;

public static class SqliteDataReaderExt
{
    internal static IEnumerable<SqliteDataReader> ToEnumerable(this SqliteDataReader reader)
    {
        while (reader.Read())
        {
            yield return reader;
        }
    }
}
