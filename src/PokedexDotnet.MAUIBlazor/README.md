# PokedexDotnet.MAUIBlazor

.NET MAUI Blazor Hybrid で作成された、SQLite3 を DB のバックエンドとして利用する Pokedex アプリ。

## Razor Components を Blazor custom elements として利用する

厳密に言うと、このプロジェクトでは Razor Components を Blazor custom elements として扱っていません。
Razor Components を root component として登録し、JavaScript から呼び出せるようにしています。

ref: [Use Razor components in JavaScript apps and SPA frameworks](https://learn.microsoft.com/en-us/aspnet/core/blazor/components/js-spa-frameworks?view=aspnetcore-8.0)

制約事項や特徴などが Blazor custom elements と似通っているため、ここでは Blazor custom elements として扱っています。

### .NET MAUI Blazor Hybrid での Root Component への登録

.NET MAUI Blazor Hybrid では、`BlazorWebView` における `RootComponents` プロパティに登録することで、Blazor のルートコンポーネントを指定することが出来ます。

テンプレートから作成された .NET MAUI Blazor Hybrid アプリケーションでは、`MainPage.xaml` に `BlazorWebView` コンポーネントが配置されており、`RootComponents` プロパティに `RootComponent` が配置されています。

これに習い、コードビハインドから `RootComponents` プロパティに `RootComponent` を登録します。

以下のコードは、`FetchPokemon` コンポーネントを `fetch-pokemon-react` という名前で登録する例です。

MainPage.xaml.cs
```csharp
// https://learn.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.components.web.jscomponentconfigurationextensions.registerforjavascript?view=aspnetcore-8.0
using Microsoft.AspNetCore.Components.Web; // Add this

...

public MainPage()
{
    InitializeComponent();

    // Add this
    blazorWebView.RootComponents.RegisterForJavaScript<Components.JSInterop.FetchPokemon>("fetch-pokemon-react");
}
```

これにより、Blazor 環境下の JavaScript アプリケーションから、`fetch-pokemon-react` という名前で `FetchPokemon` コンポーネントを呼び出すことが出来るようになります。

### JavaScript からのコンポーネントの呼び出し

see: [@pokedex-dotnet-react/interop-mauiblazor](../../react/packages/interop-mauiblazor/README.md)

## JavaScript との相互運用

RootComponent として登録された Razor Components で公開されているメソッドを JavaScript から呼び出すことが出来ます。
また `EventCallback` を利用して、.NET から JavaScript の関数を呼び出すことが出来ます。

### JavaScript から .NET の呼び出し

JavaScript へ .NET のメソッドを公開するには、[`JSInvokable`](https://learn.microsoft.com/en-us/dotnet/api/microsoft.jsinterop.jsinvokableattribute?view=aspnetcore-8.0) 属性を利用します。

このプロジェクトでは、`FetchPokemon` コンポーネントで `FetchPokemons` メソッドを `JSInvokable` 属性を付与して公開しています。

FetchPokemon.razor.cs
```csharp
using Microsoft.JSInterop;

...

[JSInvokable]
public async Task<Pokemon[]> FetchPokemons()
{
    if (DataSource == null) return Array.Empty<Pokemon>();

    var dbHelper = new SqliteConnectionWrapper(() => DataSource);
    var pokemons = await PokedexDotnet.Shared.Usecases.QueryPokemon.FetchPokemons(dbHelper);
    return pokemons;
}
```

このメソッドは、JavaScript から `dotnetRef.invokeMethodAsync("FetchPokemons")` として呼び出すことが出来ます。

上記の呼び出しで `dotnetRef` 変数が使用されています。
これは、`BlazorWebView` における `RootComponents` プロパティに登録されたコンポーネントに対して、JavaScript からアクセスするための参照です。

C# 側では [DotNetObjectReference](https://learn.microsoft.com/en-us/dotnet/api/microsoft.jsinterop.dotnetobjectreference?view=aspnetcore-8.0) として提供されています。

このプロジェクトでは、`BaseComponent` という実装するコンポーネントの基底クラスを作成し、`DotNetObjectReference` を保持するプロパティや、JavaScript 側にコールバックで参照を渡すための実装を提供しています。

### .NET から JavaScript の呼び出し

.NET から JavaScript の呼び出しは、[EventCallback](https://learn.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.components.eventcallback?view=aspnetcore-8.0) に登録されたコールバックを実行することで行います。

このプロジェクトでは、`BaseComponent` コンポーネントで、コンポーネントのレンダリングが完了した際に、対象のコンポーネントの参照を JavaScript に渡すために利用しています。

BaseComponent.cs
```csharp
using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;

...

[Parameter] public EventCallback<DotNetObjectReference<T>> OnComponentInitializedCb { get; set; }
```

## .NET MAUI Blazor Hybrid から React アプリケーションを呼び出す

.NET MAUI Blazor Hybrid から React アプリケーションのような、UI を伴う JavaScript アプリケーションを呼び出すことが出来ます。

ref: [JavaScript libraries that render UI](https://learn.microsoft.com/en-us/aspnet/core/blazor/javascript-interoperability/call-javascript-from-dotnet?view=aspnetcore-8.0#javascript-libraries-that-render-ui)

このプロジェクトでは、BlazorWebView の RootComponent として呼び出される `ViewRoot.razor` に空の `div` 要素を配置し、その `div` 要素に対して React アプリケーションをマウントすることで、React アプリケーションを呼び出しています。

[@pokedex-dotnet-react/entry-mauiblazor](../../react/apps/entry-mauiblazor) のビルド成果物を、`wwwroot/js` ディレクトリに配置し、[`IJSRuntime.InvokeAsync`](https://learn.microsoft.com/en-us/dotnet/api/microsoft.jsinterop.ijsruntime.invokeasync?view=aspnetcore-8.0) メソッドを利用して、モジュールの読み込みと React アプリケーションのマウント関数の実行を行っています。

## Blazor custom elements のデバッグ

JavaScript から呼び出される Blazor custom elements は、Blazor のコンポーネントとして実装されているため、Blazor のデバッグ機能を利用することが出来ます。

VS Code などからデバッグ実行を行い、ブレークポイントを設定することで、Blazor custom elements のコードをデバッグすることが出来ます。

BlazorWebView 上で実行している JavaScript のエラーなどは、ブラウザのデベロッパーツールなどを利用してデバッグすることが出来ます。
以下の Microsoft Learn ドキュメントを参考にしてください。

ref: [Use browser developer tools with ASP.NET Core Blazor Hybrid](https://learn.microsoft.com/en-us/aspnet/core/blazor/hybrid/developer-tools?view=aspnetcore-8.0)

