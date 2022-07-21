using System.Net;
using CoreGularECommerce.Application.Abstraction;
using CoreGularECommerce.Application.Repositories.ProductRepository;
using CoreGularECommerce.Application.RequestParameters;
using CoreGularECommerce.Application.ViewModels.Products;
using CoreGularECommerce.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace CoreGularECommerce.API.Controllers;

[Route("api/[controller]")]
[ApiController]
[Produces("application/json")]
public class ProductsController : Controller
{
    private readonly IProductService _productService;
    private readonly IProductManipulatableRepository _productManipulatableRepository;
    private readonly IProductQueryableRepository _productQueryableRepository;

    public ProductsController(IProductService productService,
        IProductManipulatableRepository productManipulatableRepository,
        IProductQueryableRepository productQueryableRepository)
    {
        _productService = productService;
        _productManipulatableRepository = productManipulatableRepository;
        _productQueryableRepository = productQueryableRepository;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] Pagination pagination)
    {
        var totalCount = _productQueryableRepository.GetAll().Count();
        var products = _productQueryableRepository.GetAll(false)
            .Skip(pagination.Page * pagination.Size).Take(pagination.Size)
            .Select(p => new
            {
                Id = p.Id,
                Name = p.Name,
                Stock = p.Stock,
                Price = p.Price,
                CreatedAt = p.CreatedAt,
                UpdatedAt = p.UpdatedAt
            }).ToList();
        if (!products.Any())
        {
            return BadRequest("Hiçbir ürün bulunamadı!");
        }

        return Ok(new
        {
            Count = totalCount,
            Rows = products
        });
    }

    [HttpPost]
    public async Task<IActionResult> Add(CreateProductViewModel createProductViewModel)
    {
        var product = new Product
        {
            Name = createProductViewModel.Name,
            Price = createProductViewModel.Price,
            Stock = createProductViewModel.Stock
        };
        await _productManipulatableRepository.AddAsync(product);
        await _productManipulatableRepository.SaveChangesAsync();
        return StatusCode((int)HttpStatusCode.Created);
    }

    [HttpGet("{Id:guid}")]
    public async Task<IActionResult> Get(Guid Id)
    {
        var product = await _productQueryableRepository.GetByIdAsync(Id, false);
        return Ok(product);
    }

    [HttpPut]
    public async Task<IActionResult> Update(UpdateProductViewModel updateProductViewModel)
    {
        var product = await _productQueryableRepository.GetByIdAsync(updateProductViewModel.Id);
        if (product == null)
        {
            return BadRequest("Güncellemek istediğiniz ürün bulunamadı!");
        }

        product.Name = updateProductViewModel.Name;
        product.Stock = updateProductViewModel.Stock;
        product.Price = updateProductViewModel.Price;
        await _productManipulatableRepository.SaveChangesAsync();
        return StatusCode((int)HttpStatusCode.OK);
    }

    [HttpDelete]
    public async Task<IActionResult> Remove(DeleteProductViewModel deleteProductViewModel)
    {
        var product = await _productQueryableRepository.GetByIdAsync(deleteProductViewModel.Id);
        if (product == null)
        {
            return BadRequest("Silmek istediğiniz ürün bulunamadı");
        }

        await _productManipulatableRepository.RemoveAsync(deleteProductViewModel.Id);
        await _productManipulatableRepository.SaveChangesAsync();
        return StatusCode((int)HttpStatusCode.NoContent);
    }
}