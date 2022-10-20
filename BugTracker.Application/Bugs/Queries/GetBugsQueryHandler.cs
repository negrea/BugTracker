using AutoMapper;
using BugTracker.Application.Bugs.DTOs;
using BugTracker.Application.Interfaces;
using MediatR;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace BugTracker.Application.Bugs.Queries
{
    public class GetBugsQueryHandler : IRequestHandler<GetBugsQuery, List<BugDto>>
    {
        private readonly IBugRepository _bugRepository;
        private readonly IMapper _mapper;

        public GetBugsQueryHandler(IBugRepository bugRepository, IMapper mapper)
        {
            _bugRepository = bugRepository;
            _mapper = mapper;
        }

        public async Task<List<BugDto>> Handle(GetBugsQuery request, CancellationToken cancellationToken)
        {
            var bugs = await _bugRepository.GetAllAsync(cancellationToken);
            return _mapper.Map<List<BugDto>>(bugs);
        }

    }
}
