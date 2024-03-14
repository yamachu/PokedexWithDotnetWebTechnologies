# @pokedex-dotnet-react/interop-mauiblazor

PokedexDotnet.MAUIBlazor で提供されている Blazor custom elements を React で利用するためのラッパーライブラリ。

## JavaScript からのコンポーネントの呼び出し

[aspnet/samples](https://github.com/aspnet/samples/tree/main/samples/aspnetcore/blazor/JSComponentGeneration) で提供されているカスタムフックを使用しています。

.NET MAUI Blazor Hybrid アプリで `RegisterForJavaScript` を使用して登録した indentifier を引数に取り、カスタムフックを呼び出している parentElement に対して、Blazor custom elements を追加しています。
この identifier 引数は、`-js` を除いたものを使用します。

```tsx
const fragment = useBlazor('fetch-pokemon', { /* props */ });
```

また第2引数には、`Parameter` アトリビュートで指定したプロパティを渡すことが出来ます。

得られた `fragment` は、React の `ReactElement` として扱うことが出来ます。
同一の parentElement に対して複数の Blazor custom elements は追加することが出来ないため、jsx 内で以下のように div 要素などでラップして利用することを推奨します。

```tsx
return (
  <div>
    Some content
    <div>
      {fragment}
    </div>
  </div>
);
```

## 呼び出したコンポーネントのインスタンスメソッドの呼び出し

.NET MAUI Blazor Hybrid アプリでコンポーネントの基底クラスに使用している `BaseComponent` で実装している `OnComponentInitializedCb` や `OnComponentDestroyedCb` に対して、useDotnetRef フックから取得したコールバックを渡して、EventCallback に登録します。
このコールバックから得た [DotNetObjectReference](https://learn.microsoft.com/en-us/aspnet/core/blazor/javascript-interoperability/call-dotnet-from-javascript?view=aspnetcore-8.0) を使用して、インスタンスメソッドを呼び出すことが出来ます。

以下のコードでは、コンポーネントで提供している `FetchPokemons` メソッドを呼び出しています。

```tsx
dotnetRef.invokeMethodAsync("FetchPokemons");
```

## コンポーネントに渡せるプロパティの型

- string, bool, number のようなプリミティブ型
- JSON Serializable可能なオブジェクト
- EventCallback に登録する関数
  - () => void or (_: any) => void
