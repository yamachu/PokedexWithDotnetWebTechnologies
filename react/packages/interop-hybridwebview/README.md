# @pokedex-dotnet-react/interop-hybridwebview

PokedexDotnet.Experimental.HybridWebView で提供されている HybridWebView を React で利用するためのラッパーライブラリ。

## メッセージングを利用したインスタンスメソッドの呼び出し

`HybridWebView` は、.NET アプリケーションに対してメッセージングを利用して、JavaScript から .NET のインスタンスメソッドを呼び出すことが出来ます。

3つのメソッドが HybridWebView より提供されています。

- SendRawMessageToDotNet
  - .NET に対してメッセージを送信します
  - 戻り値は受け取れません
- SendInvokeMessageToDotNet
  - .NET のメソッドを呼び出します
  - 戻り値は受け取れません
- SendInvokeMessageToDotNetAsync
  - .NET のメソッドを非同期で呼び出します
  - 戻り値を受け取ることが可能です
  - 呼び出したメソッドが同期メソッドである場合は、`Promise` でラップされた値が返ります
  - 呼び出したメソッドが非同期メソッドである場合は、.NET の `Task` をベースとした値が返ります

これらのメソッドを `useHybeidWebView` カスタムフックを使用して呼び出すことが出来ます。

上記の3つのメソッドに加え、非同期呼び出しで .NET の非同期メソッドを呼び出すための `sendInvokeMessageToDotNetAsyncTask` も提供しています。
`Task` ベースで返るため、得られた値の `Result` フィールドを使用して、非同期メソッドの戻り値を取得することが出来ます。

```tsx
const { sendInvokeMessageToDotNetAsyncTask } = useHybridWebView();

const fetchPokemons = React.useCallback((): Promise<Pokemon[]> => {
    return sendInvokeMessageToDotNetAsyncTask("FetchPokemons", [])
      .then((v) => v.Result)
      .then((pokemons: any[]) =>
        pokemons.map((p) => ({ id: p.Id, name: p.Name }))
      );
}, [sendInvokeMessageToDotNetAsync]);
```
