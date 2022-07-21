using CoreGularECommerce.Domain.Entities.Common;

namespace CoreGularECommerce.Domain.Entities;

public class Product: BaseEntity
{
    public string Name { get; set; }
    public int Stock { get; set; }
    public decimal Price { get; set; }
    
    public virtual ICollection<Order> Orders { get; set; }
}