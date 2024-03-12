using System.Data;
using Dapper;

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