namespace CoreGularECommerce.Persistence.Repositories.CustomerRepository;

public class CustomerManipulatableRepository: ManipulatableRepository<Customer>, ICustomerManipulatableRepository
{
    public CustomerManipulatableRepository(CoreGularCommerceApiDbContext context) : base(context)
    {
    }
}