using CoreGularECommerce.Domain.Entities.Common;

namespace CoreGularECommerce.Domain.Entities;

public class Customer: BaseEntity
{
    public string Name { get; set; }
    public virtual ICollection<Order> Orders { get; set; }
}