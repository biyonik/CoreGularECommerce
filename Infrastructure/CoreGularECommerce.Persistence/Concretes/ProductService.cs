using CoreGularECommerce.Persistence.Contexts.EntityFramework;
using Microsoft.EntityFrameworkCore;

namespace CoreGularECommerce.Persistence.Concretes;

public class ProductService : IProductService
{
    public async Task<List<Product>> GetAllProducts()
    {
        var context = new CoreGularCommerceApiDbContext();
        return await context.Products.ToListAsync();
    }
}