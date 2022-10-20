using BugTracker.Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace BugTracker.Infrastructure.Data
{
    public class BugTrackerContext : DbContext
    {
        public BugTrackerContext(DbContextOptions<BugTrackerContext> options)
            : base(options)
        {
        }

        public DbSet<Person> People { get; set; }
        public DbSet<Bug> Bugs { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.BuildPerson();
            modelBuilder.BuildBug();
        }
    }
}
