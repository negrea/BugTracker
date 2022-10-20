using BugTracker.Core.Entities;
using MediatR;
using System.Collections.Generic;

namespace BugTracker.Application.People.Queries
{
    public class GetPeopleQuery : IRequest<List<Person>>
    {
    }
}
