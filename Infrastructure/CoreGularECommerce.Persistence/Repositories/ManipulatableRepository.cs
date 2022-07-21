using CoreGularECommerce.Application.Repositories;
using CoreGularECommerce.Domain.Entities.Common;
using CoreGularECommerce.Persistence.Contexts.EntityFramework;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace CoreGularECommerce.Persistence.Repositories;

public class ManipulatableRepository<TEntity> : IManipulatableRepository<TEntity> where TEntity : BaseEntity
{
    private readonly CoreGularCommerceApiDbContext _context;

    public ManipulatableRepository(CoreGularCommerceApiDbContext context)
    {
        _context = context;
    }

    public DbSet<TEntity> Table => _context.Set<TEntity>();

    public bool Add(TEntity model)
    {
        EntityEntry<TEntity> entityEntry = Table.Add(model);
        return entityEntry.State == EntityState.Added;
    }

    public bool AddRange(List<TEntity> models)
    {
        Table.AddRange(models);
        return true;
    }

    public bool Remove(TEntity model)
    {
        EntityEntry<TEntity> entityEntry = Table.Remove(model);
        return entityEntry.State == EntityState.Deleted;
    }

    public bool RemoveRange(List<TEntity> models)
    {
        Table.RemoveRange(models);
        return true;
    }

    public bool Update(TEntity model)
    {
        EntityEntry<TEntity> entityEntry = Table.Update(model);
        return entityEntry.State == EntityState.Modified;
    }

    public int SaveChanges()
    {
        return _context.SaveChanges();
    }

    public async Task<bool> AddAsync(TEntity model)
    {
        EntityEntry<TEntity> entityEntry = await Table.AddAsync(model);
        return entityEntry.State == EntityState.Added;
    }

    public async Task<bool> AddRangeAsync(List<TEntity> models)
    {
        await Table.AddRangeAsync(models);
        return true;
    }

    public async Task<bool> RemoveAsync(Guid Id)
    {
        var model = await Table.FirstOrDefaultAsync(x => x.Id == Id);
        return Remove(model);
    }

    public async Task<int> SaveChangesAsync()
    {
        return await _context.SaveChangesAsync();
    }
}