namespace CoreGularECommerce.Persistence.Utils;

public static class ServiceRegistration
{
    public static void AddPersistenceServices(this IServiceCollection serviceCollection)
    {
        serviceCollection.AddSingleton<IProductService, ProductService>();
        serviceCollection.AddDbContext<CoreGularCommerceApiDbContext>();
        serviceCollection.AddScoped<ICustomerQueryableRepository, CustomerQueryableRepository>();
        serviceCollection.AddScoped<ICustomerManipulatableRepository, CustomerManipulatableRepository>();
        serviceCollection.AddScoped<IProductQueryableRepository, ProductQueryableRepository>();
        serviceCollection.AddScoped<IProductManipulatableRepository, ProductManipulatableRepository>();
        serviceCollection.AddScoped<IOrderQueryableRepository, OrderQueryableRepository>();
        serviceCollection.AddScoped<IOrderManipulatableRepository, OrderManipulatableRepository>();
    }
}