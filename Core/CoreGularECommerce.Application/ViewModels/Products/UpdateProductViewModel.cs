namespace CoreGularECommerce.Application.ViewModels.Products;

public class UpdateProductViewModel
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public int Stock { get; set; }
    public decimal Price { get; set; }
}