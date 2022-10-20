using BugTracker.Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace BugTracker.Infrastructure.Data
{
    public static class ModelBuilderExtensions
    {
        public static void BuildPerson(this ModelBuilder builder)
        {
            var entity = builder.Entity<Person>().ToTable("People");
            entity.Property(p => p.Id).HasColumnType("uniqueidentifier");
            entity.Property(p => p.CreationDate).HasColumnType("smalldatetime").IsRequired();
            entity.Property(p => p.ModifiedDate).HasColumnType("smalldatetime");
            entity.Property(p => p.FirstName).HasColumnType("nvarchar(50)").IsRequired();
            entity.Property(p => p.LastName).HasColumnType("nvarchar(50)").IsRequired();
        }

        public static void BuildBug(this ModelBuilder builder)
        {
            var entity = builder.Entity<Bug>().ToTable("Bugs");
            entity.Property(p => p.Id).HasColumnType("uniqueidentifier");
            entity.Property(p => p.CreationDate).HasColumnType("smalldatetime").IsRequired();
            entity.Property(p => p.ModifiedDate).HasColumnType("smalldatetime");
            entity.Property(p => p.Title).HasColumnType("nvarchar(150)").IsRequired();
            entity.Property(p => p.Description).HasColumnType("text");
            entity.Property(p => p.Status).HasColumnType("smallint").IsRequired();
            entity.Property(p => p.PersonId).HasColumnType("uniqueidentifier");
        }
    }
}
