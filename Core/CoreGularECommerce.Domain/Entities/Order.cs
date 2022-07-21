using CoreGularECommerce.Domain.Entities.Common;

namespace CoreGularECommerce.Domain.Entities;

public class Order: BaseEntity
{
    public string Description { get; set; }
    public string Address { get; set; }
    public Guid CustomerId { get; set; }
    
    public virtual Customer Customer { get; set; }
    public virtual ICollection<Product> Products { get; set; }
}