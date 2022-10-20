using System;

namespace BugTracker.Core.Interfaces
{
    public interface IBaseEntity
    {
        public Guid Id { get; }
        public DateTime CreationDate { get; }
        public DateTime? ModifiedDate { get; }
    }
}
