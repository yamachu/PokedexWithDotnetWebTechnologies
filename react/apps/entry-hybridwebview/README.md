# @pokedex-dotnet-react/entry-hybridwebview

PokedexDotnet.Experimental.HybridWebView で提供されている HybridWebView を React で利用したサンプルアプリ。

## 注意

`App.tsx` 内で呼び出している `useFetchPokemon` の `DataSourceGetter` のパスは、現在 macOS でのみ動作するようになっています。
使用する OS に合わせたパスに変更してください。

## ビルド成果物の配置

本プロジェクトでは Vite をビルドツールとして使用しています。
build プロパティの outDir に .NET MAUI Blazor Hybrid のプロジェクトの `Resources/Raw/hybrid_root` ディレクトリを指定することで、ビルド成果物を配置することが出来ます。

```js
{
  "build": {
    "outDir": "../../../src/PokedexDotnet.Experimental.HybridWebView/Resources/Raw/hybrid_root",
  }
}
```
