using System.Linq.Expressions;
using CoreGularECommerce.Domain.Entities.Common;

namespace CoreGularECommerce.Application.Repositories;

public interface IQueryableRepository<TEntity>: IRepository<TEntity> where TEntity: BaseEntity
{
    IQueryable<TEntity> GetAll(bool tracking = true);
    IQueryable<TEntity> GetWhere(Expression<Func<TEntity, bool>> method, bool tracking = true);
    TEntity GetSingle(Expression<Func<TEntity, bool>> method, bool tracking = true);
    TEntity GetById(Guid Id, bool tracking = true);
    
    Task<TEntity> GetSingleAsync(Expression<Func<TEntity, bool>> method, bool tracking = true);
    Task<TEntity> GetByIdAsync(Guid Id, bool tracking = true);
}