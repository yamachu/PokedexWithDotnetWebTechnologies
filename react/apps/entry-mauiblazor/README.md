# @pokedex-dotnet-react/entry-mauiblazor

PokedexDotnet.MAUIBlazor で提供されている Blazor custom elements を React で利用したサンプルアプリ。

## 注意

`App.tsx` 内で呼び出している `useFetchPokemon` の `DataSourceGetter` のパスは、現在 macOS でのみ動作するようになっています。
使用する OS に合わせたパスに変更してください。

## エントリーポイントの提供

.NET MAUI Blazor Hybrid の `ViewRoot.razor` で実行している関数を、React のアプリケーションの実行におけるエントリーポイントとして提供します。

```tsx
const BlazorMountPoint = "js-root";

const render = () =>
  ReactDOM.createRoot(document.getElementById(BlazorMountPoint)!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );

export const renderJSComponent = render;
```

## ビルド成果物の配置

本プロジェクトでは Vite をビルドツールとして使用しています。
build プロパティの outDir に .NET MAUI Blazor Hybrid のプロジェクトの `wwwroot/js` ディレクトリを指定することで、ビルド成果物を配置することが出来ます。

```js
{
  "build": {
    "outDir": "../../../src/PokedexDotnet.MAUIBlazor/wwwroot/js",
  }
}
```

## デバッグ

Browser の developer tools を利用してデバッグを行うことが出来ます。
他に React のデバッグツールなどを利用することで、React アプリケーションのデバッグを容易に行うことが出来ます。

このプロジェクトでは、[`react-devtools`](https://www.npmjs.com/package/react-devtools) を利用しています。

.NET MAUI Blazor Hybrid アプリで有効にするには、`wwwroot/index.html` の head 要素内に以下のように記述します。

```html
<script src="http://localhost:8097"></script>
```

この設定を行った状態で、.NET MAUI Blazor Hybrid アプリを実行すると、`react-devtools` 経由で React アプリケーションのデバッグを行うことが出来ます。
