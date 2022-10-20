using BugTracker.Core.Entities;
using MediatR;
using System;

namespace BugTracker.Application.Bugs.Commands
{
    public class CreateBugCommand : IRequest<Bug>
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public Guid? PersonId { get; set; }
    }
}
