using BugTracker.Core.Entities;
using MediatR;

namespace BugTracker.Application.People.Commands
{
    public class CreatePersonCommand : IRequest<Person>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}
