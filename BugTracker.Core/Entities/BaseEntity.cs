using BugTracker.Core.Interfaces;
using System;

namespace BugTracker.Core.Entities
{
    public class BaseEntity : IBaseEntity
    {
        public Guid Id { get; private set; }
        public DateTime CreationDate { get; private set; }
        public DateTime? ModifiedDate { get; set; }

        public BaseEntity()
        {
            Id = Guid.NewGuid();
            CreationDate = DateTime.Now;
        }
    }
}
