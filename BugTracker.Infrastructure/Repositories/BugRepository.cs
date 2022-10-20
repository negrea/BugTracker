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
    public class BugRepository : IBugRepository
    {
        private readonly BugTrackerContext _context;

        public BugRepository(BugTrackerContext context)
        {
            _context = context;
        }

        public async Task<Bug> GetAsync(Guid personId, CancellationToken cancellationToken = default)
            => await _context.Bugs.FindAsync(new object[] { personId }, cancellationToken);

        public Task<List<Bug>> GetAllAsync(CancellationToken cancellationToken = default)
            => _context.Bugs.AsNoTracking().Include(b => b.Person).ToListAsync(cancellationToken);

        public void Create(Bug bug)
        {
            _context.Bugs.Add(bug);
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
