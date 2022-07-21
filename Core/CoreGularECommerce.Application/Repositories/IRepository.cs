using CoreGularECommerce.Domain.Entities.Common;
using Microsoft.EntityFrameworkCore;

namespace CoreGularECommerce.Application.Repositories;

public interface IRepository<TEntity> where TEntity : BaseEntity
{
    DbSet<TEntity> Table { get; }
}