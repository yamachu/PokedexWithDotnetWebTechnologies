# @pokedex-dotnet-react/entry-mauiblazor

PokedexDotnet.MAUIBlazor で提供されている Blazor custom elements を React で利用したサンプルアプリ。

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

