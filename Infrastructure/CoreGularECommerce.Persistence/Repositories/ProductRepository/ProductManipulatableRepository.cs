namespace CoreGularECommerce.Persistence.Repositories.ProductRepository;

public class ProductManipulatableRepository: ManipulatableRepository<Product>, IProductManipulatableRepository
{
    public ProductManipulatableRepository(CoreGularCommerceApiDbContext context) : base(context)
    {
    }
}