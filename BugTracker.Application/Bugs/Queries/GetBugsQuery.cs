using BugTracker.Application.Bugs.DTOs;
using MediatR;
using System.Collections.Generic;

namespace BugTracker.Application.Bugs.Queries
{
    public class GetBugsQuery : IRequest<List<BugDto>>
    {
    }
}
