namespace CoreGularECommerce.Persistence.Repositories.CustomerRepository;

public class CustomerQueryableRepository: QueryableRepository<Customer>, ICustomerQueryableRepository
{
    public CustomerQueryableRepository(CoreGularCommerceApiDbContext context) : base(context)
    {
    }
}