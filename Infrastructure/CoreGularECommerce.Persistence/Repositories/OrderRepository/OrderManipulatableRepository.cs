namespace CoreGularECommerce.Persistence.Repositories.OrderRepository;

public class OrderManipulatableRepository: ManipulatableRepository<Order>, IOrderManipulatableRepository
{
    public OrderManipulatableRepository(CoreGularCommerceApiDbContext context) : base(context)
    {
    }
}