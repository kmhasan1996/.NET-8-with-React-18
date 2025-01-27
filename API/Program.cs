using Microsoft.EntityFrameworkCore;
using Persistence;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
var app = builder.Build();

// Automatically create and apply migrations
using (var scope = app.Services.CreateScope())
{
    var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
    try
    {
        var dataContext = scope.ServiceProvider.GetRequiredService<DataContext>();

        // Apply any pending migrations
        if (dataContext.Database.GetPendingMigrations().Any())
        {
            await  dataContext.Database.MigrateAsync();
            logger.LogError("Migration successfully applied to database");
        }
        await Seed.SeedData(dataContext);
        
    }
    catch (Exception ex)
    {
        logger.LogError(ex, "Error occured during migration");
    }
   
}


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

await app.RunAsync();
