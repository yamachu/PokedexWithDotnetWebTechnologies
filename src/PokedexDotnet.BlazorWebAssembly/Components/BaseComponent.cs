namespace PokedexDotnet.BlazorWebAssembly.Components;

using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;

public class BaseComponent<T> : ComponentBase, IDisposable where T : class
{
    [Parameter] public EventCallback<DotNetObjectReference<T>> OnComponentInitializedCb { get; set; }
    [Parameter] public EventCallback OnComponentDestroyedCb { get; set; }

    private DotNetObjectReference<T>? objRef;

    protected override void OnInitialized()
    {
#pragma warning disable CS8634, CS8619
        objRef = DotNetObjectReference.Create(this as T);
#pragma warning restore CS8634, CS8619
    }

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        await base.OnAfterRenderAsync(firstRender);
        if (firstRender)
        {
            await OnComponentInitializedCb.InvokeAsync(objRef);
        }
    }

    public async void Dispose()
    {
        GC.SuppressFinalize(this);

        if (objRef != null)
        {
            await OnComponentDestroyedCb.InvokeAsync();
            objRef?.Dispose();
        }
    }
}