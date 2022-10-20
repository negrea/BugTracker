using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System;
using System.IO;

namespace BugTracker.Infrastructure.Data
{
    public class BugTrackerDesignTimeDbContextFactory : IDesignTimeDbContextFactory<BugTrackerContext>
    {
        public BugTrackerContext CreateDbContext(string[] args)
        {
            var configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .Build();

            var connectionString = configuration.GetConnectionString("DatabaseConnection");
            var defaultPath = Path.Join(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), "bugTracker.db");

            var builder = new DbContextOptionsBuilder<BugTrackerContext>();
            builder.UseSqlite(!string.IsNullOrEmpty(connectionString)
                    ? connectionString
                    : @$"Data Source={defaultPath}");

            return new BugTrackerContext(builder.Options);
        }
    }
}
