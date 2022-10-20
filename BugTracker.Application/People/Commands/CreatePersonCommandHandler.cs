using BugTracker.Application.Interfaces;
using BugTracker.Core.Entities;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace BugTracker.Application.People.Commands
{
    public class CreatePersonCommandHandler : IRequestHandler<CreatePersonCommand, Person>
    {
        private readonly IPersonRepository _personRepository;

        public CreatePersonCommandHandler(IPersonRepository personRepository)
        {
            _personRepository = personRepository;
        }

        public async Task<Person> Handle(CreatePersonCommand request, CancellationToken cancellationToken)
        {
            var person = new Person(request.FirstName, request.LastName);

            _personRepository.Create(person);
            await _personRepository.SaveChangesAsync(cancellationToken);

            return person;
        }
    }
}
