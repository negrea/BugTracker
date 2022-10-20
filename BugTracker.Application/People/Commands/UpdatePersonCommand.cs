using BugTracker.Core.Entities;
using MediatR;
using System;

namespace BugTracker.Application.People.Commands
{
    public class UpdatePersonCommand : IRequest<Person>
    {
        public Guid Id { get; init; }
        public string FirstName { get; init; }
        public string LastName { get; init; }
    }
}
