using BugTracker.Core.Entities;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace BugTracker.Application.Interfaces
{
    public interface IBugRepository : IDisposable
    {
        Task<Bug> GetAsync(Guid personId, CancellationToken cancellationToken = default);
        Task<List<Bug>> GetAllAsync(CancellationToken cancellationToken = default);
        void Create(Bug create);
        Task SaveChangesAsync(CancellationToken cancellationToken = default);
    }
}
