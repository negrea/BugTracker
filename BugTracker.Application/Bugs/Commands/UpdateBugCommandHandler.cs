using AutoMapper;
using BugTracker.Application.Interfaces;
using BugTracker.Core.Entities;
using BugTracker.Core.ValueObjects;
using MediatR;
using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;

namespace BugTracker.Application.Bugs.Commands
{

    public class UpdateBugCommandHandler : IRequestHandler<UpdateBugCommand, Bug>
    {
        private readonly IBugRepository _bugRepository;
        private readonly IMapper _mapper;

        public UpdateBugCommandHandler(IBugRepository bugRepository, IMapper mapper)
        {
            _bugRepository = bugRepository;
            _mapper = mapper;
        }

        public async Task<Bug> Handle(UpdateBugCommand command, CancellationToken cancellationToken)
        {
            var bug = await _bugRepository.GetAsync(command.Id, cancellationToken);
            if (bug == null)
            {
                throw new BugTrackerException("Bug not found.", HttpStatusCode.NotFound);
            }

            _mapper.Map(command, bug);
            bug.ModifiedDate = DateTime.Now;

            await _bugRepository.SaveChangesAsync(cancellationToken);

            return bug;
        }
    }
}
