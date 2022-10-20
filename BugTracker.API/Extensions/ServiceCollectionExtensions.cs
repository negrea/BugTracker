using BugTracker.API.Configuration;
using BugTracker.Application;
using BugTracker.Application.Interfaces;
using BugTracker.Infrastructure.Data;
using BugTracker.Infrastructure.Repositories;
using FluentValidation;
using MediatR;
using MediatR.Pipeline;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using System.Reflection;

namespace BugTracker.API.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddSwagger(this IServiceCollection services)
        {
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen(options =>
            {
                options.SwaggerDoc("v1", new OpenApiInfo
                {
                    Version = "v1",
                    Title = "Bug Tracker API",
                    Description = "A .NET 6 Web API for managing bugs developed for Aire Logic's technical test"
                });
                var xmlFilename = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                options.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, xmlFilename));
            });
            return services;
        }

        public static IServiceCollection AddBugTrackerContext(this IServiceCollection services, string connectionString = null)
        {
            var defaultPath = Path.Join(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), "bugTracker.db");

            services.AddDbContext<BugTrackerContext>(options =>
                options.UseSqlite(!string.IsNullOrEmpty(connectionString)
                    ? connectionString
                    : @$"Data Source={defaultPath}"));

            return services;
        }

        public static IServiceCollection AddRepositories(this IServiceCollection services)
        {
            services.AddTransient<IPersonRepository, PersonRepository>();
            services.AddTransient<IBugRepository, BugRepository>();
            return services;
        }

        public static IServiceCollection AddMediatr(this IServiceCollection services)
        {
            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));
            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(RequestPreProcessorBehavior<,>));
            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(RequestPostProcessorBehavior<,>));

            services.AddMediatR(typeof(MediatrRegistration).Assembly);

            ValidatorOptions.Global.DefaultRuleLevelCascadeMode = CascadeMode.Stop;
            ValidatorOptions.Global.DefaultClassLevelCascadeMode = CascadeMode.Stop;

            AssemblyScanner.FindValidatorsInAssembly(typeof(MediatrRegistration).Assembly)
                .ForEach(result =>
                {
                    services.AddTransient(result.InterfaceType, result.ValidatorType);
                });

            return services;
        }
    }
}
