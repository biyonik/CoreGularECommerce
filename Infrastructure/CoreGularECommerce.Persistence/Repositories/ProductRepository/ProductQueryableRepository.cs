namespace CoreGularECommerce.Persistence.Repositories.ProductRepository;

public class ProductQueryableRepository: QueryableRepository<Product>, IProductQueryableRepository
{
    public ProductQueryableRepository(CoreGularCommerceApiDbContext context) : base(context)
    {
    }
}