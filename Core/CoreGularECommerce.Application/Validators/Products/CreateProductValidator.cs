using CoreGularECommerce.Application.ViewModels.Products;
using FluentValidation;

namespace CoreGularECommerce.Application.Validators.Products;

public class CreateProductValidator: AbstractValidator<CreateProductViewModel>
{
    public CreateProductValidator()
    {
        RuleFor(p => p.Name)
            .NotEmpty()
            .NotNull()
            .OverridePropertyName("Ürün Adı")
                .WithMessage("Lütfen ürün adını boş bırakmayınız.")
            .MaximumLength(150)
            .MinimumLength(2)
                .WithMessage("Lütfen ürün adını 2 ile 150 karakter ile sınırlı tutunuz.");
        RuleFor(p => p.Stock)
            .NotEmpty()
            .NotNull()
            .OverridePropertyName("Stok")
                .WithMessage("Lütfen stok bilgisini boş bırakmayınız.")
            .Must(s => s >= 0)
                .WithMessage("Stok bilgisi negatif olamaz.");
        
        RuleFor(p => p.Price)
            .NotEmpty()
            .NotNull()
            .OverridePropertyName("Ürün Fiyatı")
                .WithMessage("Lütfen fiyat bilgisini boş bırakmayınız.")
            .Must(s => s >= 0)
                .WithMessage("Fiyat bilgisi negatif olamaz.");
    }
}