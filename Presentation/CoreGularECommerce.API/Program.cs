using CoreGularECommerce.Application.Validators.Products;
using CoreGularECommerce.Infrastructure.Filters;
using CoreGularECommerce.Persistence.Utils;
using FluentValidation.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers(options => options.Filters.Add<ValidationFilter>())
    .AddFluentValidation(configuration =>
    {
        configuration.RegisterValidatorsFromAssemblyContaining<CreateProductValidator>();
    }).ConfigureApiBehaviorOptions(options => options.SuppressModelStateInvalidFilter = true);


builder.Services.AddPersistenceServices();
builder.Services.AddCors(corsOptions =>
{
    corsOptions.AddDefaultPolicy(configurePolicy =>
    {
        configurePolicy.WithOrigins("http://localhost:4200", "https://localhost:4200").AllowAnyHeader()
            .AllowAnyMethod();
    });
});
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();