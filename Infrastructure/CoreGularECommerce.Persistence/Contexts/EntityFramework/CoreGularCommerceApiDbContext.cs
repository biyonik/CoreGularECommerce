using CoreGularECommerce.Domain.Entities.Common;
using CoreGularECommerce.Persistence.Utils;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.Extensions.Configuration;

namespace CoreGularECommerce.Persistence.Contexts.EntityFramework;

public class CoreGularCommerceApiDbContext: DbContext
{
    public DbSet<Product> Products { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<Customer> Customers { get; set; }
    
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseMySql(Configuration.ConnectionString,
            ServerVersion.AutoDetect(Configuration.ConnectionString));
    }

    public override int SaveChanges()
    {
        var entries = ChangeTracker
            .Entries<BaseEntity>();
        foreach (var entityEntry in entries)
        {
            var _ = entityEntry.State switch
            {
                EntityState.Deleted => entityEntry.Entity.DeletedAt = DateTime.Now,
                EntityState.Modified => entityEntry.Entity.UpdatedAt = DateTime.Now,
                EntityState.Added => entityEntry.Entity.CreatedAt = DateTime.Now,
                _ => throw new ArgumentOutOfRangeException()
            };
        }
        return base.SaveChanges();
    }

    public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = new CancellationToken())
    {
        var entries = ChangeTracker
            .Entries<BaseEntity>();
        foreach (var entityEntry in entries)
        {
            var _ = entityEntry.State switch
            {
                EntityState.Deleted => entityEntry.Entity.DeletedAt = DateTime.Now,
                EntityState.Modified => entityEntry.Entity.UpdatedAt = DateTime.Now,
                EntityState.Added => entityEntry.Entity.CreatedAt = DateTime.Now,
                _ => throw new ArgumentOutOfRangeException()
            };
        }

        return await base.SaveChangesAsync(cancellationToken);
    }
}