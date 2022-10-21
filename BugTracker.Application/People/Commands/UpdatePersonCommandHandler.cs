using AutoMapper;
using BugTracker.Application.Interfaces;
using BugTracker.Core.Entities;
using BugTracker.Core.ValueObjects;
using MediatR;
using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;

namespace BugTracker.Application.People.Commands
{

    public class UpdatePersonCommandHandler : IRequestHandler<UpdatePersonCommand, Person>
    {
        private readonly IPersonRepository _personRepository;
        private readonly IMapper _mapper;

        public UpdatePersonCommandHandler(IPersonRepository personRepository, IMapper mapper)
        {
            _personRepository = personRepository;
            _mapper = mapper;
        }

        public async Task<Person> Handle(UpdatePersonCommand command, CancellationToken cancellationToken)
        {
            var person = await _personRepository.FindAsync(command.Id, cancellationToken);
            if (person == null)
            {
                throw new BugTrackerException($"Person not found.", HttpStatusCode.NotFound);
            }

            _mapper.Map(command, person);
            person.ModifiedDate = DateTime.Now;

            await _personRepository.SaveChangesAsync(cancellationToken);

            return person;
        }
    }
}
