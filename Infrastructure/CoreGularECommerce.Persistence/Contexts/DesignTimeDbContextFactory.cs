using CoreGularECommerce.Persistence.Contexts.EntityFramework;
using CoreGularECommerce.Persistence.Utils;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace CoreGularECommerce.Persistence.Contexts;

public class DesignTimeDbContextFactory: IDesignTimeDbContextFactory<CoreGularCommerceApiDbContext>
{
    public CoreGularCommerceApiDbContext CreateDbContext(string[] args)
    {
        DbContextOptionsBuilder<CoreGularCommerceApiDbContext> optionsBuilder = new();
        optionsBuilder.UseMySql(Configuration.ConnectionString, ServerVersion.AutoDetect(Configuration.ConnectionString));
        return new CoreGularCommerceApiDbContext();
    }
}