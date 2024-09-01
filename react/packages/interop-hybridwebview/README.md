# @pokedex-dotnet-react/interop-hybridwebview

PokedexDotnet.Experimental.HybridWebView で提供されている HybridWebView を React で利用するためのラッパーライブラリ。

## メッセージングを利用したインスタンスメソッドの呼び出し

`HybridWebView` は、.NET アプリケーションに対してメッセージングを利用して、JavaScript から .NET のインスタンスメソッドを呼び出すことが出来ます。

以下のメソッドが HybridWebView より提供されています。

- SendRawMessage
  - .NET に対してメッセージを送信します
  - 戻り値は受け取れません

上記のメソッドをラップした以下のメソッドを、 `useHybeidWebView` カスタムフックを使用して呼び出すことが出来ます。

- sendInvokeMessageToDotNetAsync
  - .NET のメソッドを非同期で呼び出します
  - 戻り値を `Promise` でラップし受け取ることが可能です

```tsx
const { sendInvokeMessageToDotNetAsync } = useHybridWebView();

const fetchPokemons = React.useCallback((): Promise<Pokemon[]> => {
    return sendInvokeMessageToDotNetAsync("FetchPokemons", [])
      .then((pokemons: any[]) =>
        pokemons.map((p) => ({ id: p.Id, name: p.Name }))
      );
}, [sendInvokeMessageToDotNetAsync]);
```
