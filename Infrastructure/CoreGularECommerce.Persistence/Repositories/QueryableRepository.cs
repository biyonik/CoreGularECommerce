using System.Linq.Expressions;
using CoreGularECommerce.Application.Repositories;
using CoreGularECommerce.Domain.Entities.Common;
using CoreGularECommerce.Persistence.Contexts.EntityFramework;
using Microsoft.EntityFrameworkCore;

namespace CoreGularECommerce.Persistence.Repositories;

public class QueryableRepository<TEntity>: IQueryableRepository<TEntity> where TEntity : BaseEntity
{
    private readonly CoreGularCommerceApiDbContext _context;

    public QueryableRepository(CoreGularCommerceApiDbContext context)
    {
        _context = context;
    }

    public DbSet<TEntity> Table => _context.Set<TEntity>();

    public IQueryable<TEntity> GetAll(bool tracking = true)
    {
        var query = Table.AsQueryable();
        if (!tracking)
        {
            query = query.AsNoTracking();
        }

        return query;
    }

    public IQueryable<TEntity> GetWhere(Expression<Func<TEntity, bool>> method, bool tracking = true)
    {
        var query = Table.Where(method);
        if (!tracking)
        {
            query = query.AsNoTracking();
        }

        return query;
    }

    public TEntity GetSingle(Expression<Func<TEntity, bool>> method, bool tracking = true)
    {
        var query = Table.AsQueryable();
        if (!tracking)
        {
            query = query.AsNoTracking();
        }

        return query.FirstOrDefault(method);
    }

    public TEntity GetById(Guid Id, bool tracking = true)
    {
        var query = Table.AsQueryable();
        if (!tracking)
        {
            query = query.AsNoTracking();
        }

        return query.FirstOrDefault(x => x.Id == Id);
    }

    public async Task<TEntity> GetSingleAsync(Expression<Func<TEntity, bool>> method, bool tracking = true)
    {
        var query = Table.AsQueryable();
        if (!tracking)
        {
            query = query.AsNoTracking();
        }

        return await query.FirstOrDefaultAsync(method);
    }

    public async Task<TEntity> GetByIdAsync(Guid Id, bool tracking = true)
    {
        var query = Table.AsQueryable();
        if (!tracking)
        {
            query = query.AsNoTracking();
        }

        return await query.FirstOrDefaultAsync(x => x.Id == Id);   
    }
}