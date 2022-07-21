using CoreGularECommerce.Domain.Entities;

namespace CoreGularECommerce.Application.Abstraction;

public interface IProductService
{
    Task<List<Product>> GetAllProducts();
}