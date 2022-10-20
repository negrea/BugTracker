using BugTracker.Core.Interfaces;
using System;

namespace BugTracker.Core.Entities
{
    public enum BugStatus
    {
        Unassigned,
        Assigned,
        Closed
    }

    public class Bug : BaseEntity, IBaseEntity
    {
        public string Title { get; init; }
        public string Description { get; init; }
        public BugStatus Status { get; private set; }
        public Guid? PersonId { get; init; }

        public virtual Person Person { get; set; }

        public Bug(string title, string description, Guid? personId = null) : base()
        {
            Title = title;
            Description = description;
            Status = personId != null ? BugStatus.Assigned : BugStatus.Unassigned;
            PersonId = personId;
        }
    }
}
