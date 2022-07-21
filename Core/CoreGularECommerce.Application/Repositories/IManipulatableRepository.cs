using CoreGularECommerce.Domain.Entities.Common;

namespace CoreGularECommerce.Application.Repositories;

public interface IManipulatableRepository<TEntity>: IRepository<TEntity> where TEntity : BaseEntity
{
    bool Add(TEntity model);
    bool AddRange(List<TEntity> models);
    bool Remove(TEntity model);
    bool RemoveRange(List<TEntity> models);
    bool Update(TEntity model);
    int SaveChanges();

    Task<bool> AddAsync(TEntity model);
    Task<bool> AddRangeAsync(List<TEntity> models);
    Task<bool> RemoveAsync(Guid Id);
    Task<int> SaveChangesAsync();
}