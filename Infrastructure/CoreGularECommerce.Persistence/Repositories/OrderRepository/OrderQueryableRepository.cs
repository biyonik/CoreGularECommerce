namespace CoreGularECommerce.Persistence.Repositories.OrderRepository;

public class OrderQueryableRepository: QueryableRepository<Order>, IOrderQueryableRepository
{
    public OrderQueryableRepository(CoreGularCommerceApiDbContext context) : base(context)
    {
    }
}