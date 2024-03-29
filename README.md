# Pokedex with .NET Web Technologies

このプロジェクトは、[.NET MAUI Blazor Hybrid](https://learn.microsoft.com/en-us/aspnet/core/blazor/hybrid/?view=aspnetcore-8.0) における [Blazor custom elements](https://learn.microsoft.com/en-us/aspnet/core/blazor/components/js-spa-frameworks?view=aspnetcore-8.0#blazor-custom-elements) や [.NET JavaScript interop on WebAssembly](https://learn.microsoft.com/en-us/aspnet/core/client-side/dotnet-interop?view=aspnetcore-8.0) また [HybridWebView(experimental)](https://github.com/Eilon/MauiHybridWebView) などの .NET Web 技術を使った Pokedex を題材としたサンプルプロジェクトです。

JavaScript ベースの SPA フレームワーク（ライブラリ）である React や Vue.js を View に採用し、コアロジックを .NET で実装する構成を想定しています。

このプロジェクトの構成を利用することで、以下のようなことが可能です。

- .NET で実装したコアロジックを、JavaScript ベースの SPA フレームワーク（ライブラリ）で利用する
- .NET MAUI Blazor Hybrid との組み合わせにより、Web アプリにネイティブの機能を追加する（Electronのような）

## プロジェクトが提供するもの

現在このプロジェクトでは以下のものを提供しています。

### PokedexDotnet.MAUIBlazor

.NET MAUI Blazor Hybrid で作成された、SQLite3 を DB のバックエンドとして利用する Pokedex アプリ。
DB 操作の処理を .NET で実装し、処理のユースケース単位で Blazor custom elements として提供しています。

このプロジェクトで、View を伴わない Blazor custom elements の実装方法や、JavaScript 相互運用について学ぶことが出来ます。

詳細: [PokedexDotnet.MAUIBlazor](./src/PokedexDotnet.MAUIBlazor/README.md)

### PokedexDotnet.Experimental.HybridWebView

.NET MAUI Blazor Hybrid で作成された、SQLite3 を DB のバックエンドとして利用する Pokedex アプリ。
DB 操作の処理を .NET で実装し、View から HybridWebView 経由で処理を呼び出すインタフェースを提供しています。

このプロジェクトで、View を JavaScript で実装し、.NET で実装したコアロジックを HybridWebView 経由で呼び出す方法を学ぶことが出来ます。

詳細: [PokedexDotnet.Experimental.HybridWebView](./src/PokedexDotnet.Experimental.HybridWebView/README.md)

### @pokedex-dotnet-react/interop-mauiblazor

PokedexDotnet.MAUIBlazor で提供されている Blazor custom elements を React で利用するためのラッパーライブラリ。
[aspnet/samples](https://github.com/aspnet/samples/tree/main/samples/aspnetcore/blazor/JSComponentGeneration) で提供されている、Blazor custom elements を React で利用するカスタムフックをベースとし、Blazor custom elements に対して Props を渡したり、イベントを受け取るためのカスタムフックを提供しています。

このプロジェクトで、Blazor custom elements を React で利用する方法を学ぶことが出来ます。

詳細: [@pokedex-dotnet-react/interop-mauiblazor](./react/packages/interop-mauiblazor/README.md)

### @pokedex-dotnet-react/entry-mauiblazor

PokedexDotnet.MAUIBlazor で提供されている Blazor custom elements を React で利用したサンプルアプリ。
.NET MAUI Blazor Hybrid の WebView における JavaScript 相互運用レイヤーから呼び出されるエントリーポイントを提供しています。

このプロジェクトで、.NET MAUI Blazor Hybrid から呼び出し可能なエントリーポイントの実装方法を学ぶことが出来ます。

詳細: [@pokedex-dotnet-react/entry-mauiblazor](./react/apps/entry-mauiblazor/README.md)

### @pokedex-dotnet-react/interop-hybridwebview

PokedexDotnet.Experimental.HybridWebView で提供されている HybridWebView を React で利用するためのラッパーライブラリ。
ビルド時にバンドルされる HybridWebView の JavaScript ライブラリを React で利用するためのカスタムフックを提供しています。

このプロジェクトで、HybridWebView を React で利用する方法を学ぶことが出来ます。

詳細: [@pokedex-dotnet-react/interop-hybridwebview](./react/packages/interop-hybridwebview/README.md)

### @pokedex-dotnet-react/entry-hybridwebview

PokedexDotnet.Experimental.HybridWebView で提供されている HybridWebView を React で利用したサンプルアプリ。
HybridWebView から呼び出されるエントリーポイントを提供しています。

このプロジェクトで、HybridWebView から呼び出し可能なエントリーポイントの実装方法を学ぶことが出来ます。

詳細: [@pokedex-dotnet-react/entry-hybridwebview](./react/apps/entry-hybridwebview/README.md)

### @pokedex-dotnet-vue/interop-mauiblazor

PokedexDotnet.MAUIBlazor で提供されている Blazor custom elements を Vue.js で利用するためのラッパーライブラリ。
[yamachu/aspnet-samples](https://github.com/yamachu/aspnet-samples/commit/e2f216267fa6201071a426e016cded16ef93a4be) で試験的に実装した、Blazor custom elements を Vue.js で利用する Composable 関数をベースとし、Blazor custom elements に対して Props を渡したり、イベントを受け取るための Composable 関数を提供しています。

このプロジェクトで、Blazor custom elements を Vue.js で利用する方法を学ぶことが出来ます。

詳細: [@pokedex-dotnet-vue/interop-mauiblazor](./vue/packages/interop-mauiblazor/README.md)

### @pokedex-dotnet-vue/entry-mauiblazor

PokedexDotnet.MAUIBlazor で提供されている Blazor custom elements を Vue.js で利用したサンプルアプリ。
.NET MAUI Blazor Hybrid の WebView における JavaScript 相互運用レイヤーから呼び出されるエントリーポイントを提供しています。

このプロジェクトで、.NET MAUI Blazor Hybrid から呼び出し可能なエントリーポイントの実装方法を学ぶことが出来ます。

詳細: [@pokedex-dotnet-vue/entry-mauiblazor](./vue/apps/entry-mauiblazor/README.md)

### PokedexDotnet.WasmConsole

.NET JavaScript interop on WebAssembly の技術を利用した .NET アプリケーションを、npm package として提供するためのサンプルプロジェクト。

WIP

## サンプルプロジェクトの実行

各プロジェクトの README を参照してください。
実行には以下の環境が必要です。

- [.NET 8](https://dotnet.microsoft.com/download) 以上
- [Node.js 20](https://nodejs.org/) 以上
- [yarn v1](https://classic.yarnpkg.com/)

また .NET MAUI Blazor Hybrid や .NET JavaScript interop on WebAssembly のプロジェクトを実行するには、各種 Workload のインストールや、関連 SDK などのインストールが必要です。

Workload のインストールは、リポジトリルートで以下のコマンドで行うことが出来ます。

```sh
$ sudo dotnet workload restore
```

その他詳しいインストール手順についは、Microsoft Learn のドキュメントを参照してください。

- [Build a .NET MAUI Blazor Hybrid app](https://learn.microsoft.com/en-us/aspnet/core/blazor/hybrid/tutorials/maui?view=aspnetcore-8.0)
- [Run .NET from JavaScript](https://learn.microsoft.com/en-us/aspnet/core/client-side/dotnet-interop?view=aspnetcore-8.0)

## 関連プロジェクト

- https://github.com/yamachu/pokedex-net-webassembly-without-blazor
  - .NET JavaScript interop on WebAssembly の技術を利用した .NET ライブラリを React や Node.js で利用するためのサンプルプロジェクト
- https://github.com/yamachu/BlazorWithReactSample
  - Component Tag Helper を利用して、Blazor custom elements を React で利用するためのコードを生成し、利用するためのサンプルプロジェクト

## ライセンス

このプロジェクトは MIT ライセンスの元で公開されています。

