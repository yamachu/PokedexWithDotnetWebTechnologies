using Microsoft.Extensions.Logging;

namespace PokedexDotnet.Experimental.HybridWebView;

public static class MauiProgram
{
	public static MauiApp CreateMauiApp()
	{
		var builder = MauiApp.CreateBuilder();
		builder
			.UseMauiApp<App>()
			.ConfigureFonts(fonts =>
			{
				fonts.AddFont("OpenSans-Regular.ttf", "OpenSansRegular");
			});

#if DEBUG
		builder.Logging.AddDebug();
#endif

		// https://github.com/dotnet/maui/issues/24497#issuecomment-2316706114
#if MACCATALYST
		Microsoft.Maui.Handlers.HybridWebViewHandler.Mapper.AppendToMapping("Inspect", (handler, view) =>
		{
			if (OperatingSystem.IsMacCatalystVersionAtLeast(16, 4))
			{
				handler.PlatformView.Inspectable = true;
				// For older versions .NET Mac Versions that don't include the Inspectable field.
				// handler.PlatformView.SetValueForKey(Foundation.NSObject.FromObject(true), new Foundation.NSString("inspectable"));
			}
		});

		// https://github.com/dotnet/maui/issues/23390#issuecomment-2202295194
		var handlerType = typeof(Microsoft.Maui.Handlers.HybridWebViewHandler);
		var field = handlerType.GetField("AppOriginUri", System.Reflection.BindingFlags.Static | System.Reflection.BindingFlags.NonPublic) ?? throw new Exception("AppOriginUri field not found");
		field.SetValue(null, new Uri("app://localhost/"));
#endif

		return builder.Build();
	}
}
