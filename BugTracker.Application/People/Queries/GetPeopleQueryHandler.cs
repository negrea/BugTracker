using BugTracker.Application.Interfaces;
using BugTracker.Core.Entities;
using MediatR;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace BugTracker.Application.People.Queries
{
    public class GetPeopleQueryHandler : IRequestHandler<GetPeopleQuery, List<Person>>
    {
        private readonly IPersonRepository _personRepository;
        public GetPeopleQueryHandler(IPersonRepository personRepository)
        {
            _personRepository = personRepository;
        }

        public async Task<List<Person>> Handle(GetPeopleQuery request, CancellationToken cancellationToken)
            => await _personRepository.GetAllAsync(cancellationToken);
    }
}
