export type BlazorRenderFragment = {
  // if you render BlazorComponent on React apps, you need to use this fragment
  fragment: React.ReactElement | null;
};
