using BugTracker.Core.Entities;
using MediatR;
using System;

namespace BugTracker.Application.Bugs.Commands
{
    public class UpdateBugCommand : IRequest<Bug>
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public BugStatus Status { get; set; }
        public Guid? PersonId { get; set; }
    }
}
