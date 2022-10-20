using BugTracker.Core.Entities;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace BugTracker.Application.Interfaces
{
    public interface IPersonRepository : IDisposable
    {
        Task<Person> GetAsync(Guid personId, CancellationToken cancellationToken = default);
        Task<Person> GetAsync(string firstName, string lastName, CancellationToken cancellationToken = default);
        Task<List<Person>> GetAllAsync(CancellationToken cancellationToken = default);
        void Create(Person person);
        Task SaveChangesAsync(CancellationToken cancellationToken = default);
    }
}
