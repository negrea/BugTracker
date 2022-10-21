using BugTracker.Application.Interfaces;
using BugTracker.Core.Entities;
using BugTracker.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace BugTracker.Infrastructure.Repositories
{
    public class PersonRepository : IPersonRepository
    {
        private readonly BugTrackerContext _context;

        public PersonRepository(BugTrackerContext context)
        {
            _context = context;
        }

        public async Task<Person> GetAsync(Guid personId, CancellationToken cancellationToken = default)
            => await _context.People.AsNoTracking().FirstOrDefaultAsync(p => p.Id == personId, cancellationToken);

        public async Task<Person> FindAsync(Guid personId, CancellationToken cancellationToken = default)
            => await _context.People.FindAsync(new object[] { personId }, cancellationToken);

        public async Task<Person> GetByNameAsync(string firstName, string lastName, CancellationToken cancellationToken = default)
            => await _context.People.AsNoTracking().FirstOrDefaultAsync(p => p.FirstName == firstName && p.LastName == lastName, cancellationToken);

        public Task<List<Person>> GetAllAsync(CancellationToken cancellationToken = default)
            => _context.People.AsNoTracking().ToListAsync(cancellationToken);

        public void Create(Person person)
        {
            _context.People.Add(person);
        }

        public async Task SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            await _context.SaveChangesAsync(cancellationToken);
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
            {
                _context.Dispose();
            }
        }

    }
}
