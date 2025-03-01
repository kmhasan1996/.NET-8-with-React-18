using Application.Activities.Commands;
using Application.Activities.Queries;
using Application.Core;
using Application.Interfaces;
using FluentValidation;
using FluentValidation.AspNetCore;
using Infrastructure.Security;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Extensions
{
    public static class ApplicationServicesExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services,IConfiguration config)
        {


            services.AddControllers(opt =>
            {
                var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
                opt.Filters.Add(new AuthorizeFilter(policy));
            }).AddFluentValidation(config =>
            {
                config.RegisterValidatorsFromAssemblyContaining<CreateActivity>();
            });
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();
            services.AddDbContext<DataContext>(opt => opt.UseSqlServer(config.GetConnectionString("DefaultConnection")));

            // Configure CORS
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy", policy =>
                {
                    policy.AllowAnyMethod()
                          .AllowAnyHeader()
                          .AllowAnyOrigin();
                         // .WithOrigins("http://localhost:5173");
                });
            });

            services.AddMediatR(typeof(GetActivityList.Handler).Assembly);
            services.AddAutoMapper(typeof(MappingProfiles).Assembly);
            services.AddFluentValidationAutoValidation();
            // services.AddValidatorsFromAssemblyContaining<Create>();
            services.AddScoped<IUserAccessor, UserAccessor>();

            return services;
        }
    }
}
