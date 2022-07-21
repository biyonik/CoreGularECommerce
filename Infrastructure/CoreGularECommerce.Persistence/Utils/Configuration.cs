using Microsoft.Extensions.Configuration;

namespace CoreGularECommerce.Persistence.Utils;

internal static class Configuration
{
    public static string ConnectionString
    {
        get
        {
            var configManager = new ConfigurationManager();
            configManager.SetBasePath(Path.Combine(Directory.GetCurrentDirectory(),
                "../../Presentation/CoreGularECommerce.API"));
            configManager.AddJsonFile("appsettings.json");
            ((IConfigurationBuilder)configManager).Build();
            return configManager.GetConnectionString("MySqlConnectionString");
        }
    }    
}