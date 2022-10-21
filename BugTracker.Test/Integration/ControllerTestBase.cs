using BugTracker.API;
using BugTracker.Infrastructure.Data;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json.Converters;
using Xunit;

namespace BugTracker.Test.Integration
{
    public class ControllerTestBase : IClassFixture<BugTrackerApiFactory<Program>>
    {
        protected readonly BugTrackerApiFactory<Program> _factory;
        protected readonly BugTrackerContext _bugTrackerContext;
        protected readonly IsoDateTimeConverter _isoDateTimeConverter;

        public ControllerTestBase(BugTrackerApiFactory<Program> factory)
        {
            _factory = factory;
            _bugTrackerContext = CreateDbContext();
            _isoDateTimeConverter = new IsoDateTimeConverter { DateTimeFormat = "dd/MM/yyyy HH:mm:ss" };
        }

        private BugTrackerContext CreateDbContext()
        {
            var scope = _factory.Services.GetService<IServiceScopeFactory>().CreateScope();

            var dbContext = scope.ServiceProvider.GetRequiredService<BugTrackerContext>();

            dbContext.Database.EnsureDeleted();
            dbContext.Database.EnsureCreated();

            return dbContext;
        }

    }
}
