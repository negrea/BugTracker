using BugTracker.API.Extensions;
using BugTracker.Application;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System.Text.Json.Serialization;

namespace BugTracker.API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services
                .AddControllers()
                .AddJsonOptions(x =>
                 {
                     x.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
                 });

            builder.Services.AddSwagger();
            builder.Services.AddBugTrackerContext(builder.Configuration.GetConnectionString("DefaultConnection"));
            builder.Services.AddRepositories();
            builder.Services.AddMediatr();
            builder.Services.AddAutoMapper(typeof(AutoMapperProfile));

            var app = builder.Build();

            app.UseExceptionHandler(exceptionHandlerApp =>
            {
                exceptionHandlerApp.RunExceptionHandler();
            });

            if (app.Environment.IsDevelopment())
            {
                app.UseSwashbuckle();
            }

            app.UseHttpsRedirection();
            app.UseAuthorization();
            app.UseStaticFiles();
            app.MapControllers();

            app.Run();
        }
    }
}