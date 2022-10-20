using BugTracker.Application.Interfaces;
using BugTracker.Core.Entities;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace BugTracker.Application.Bugs.Commands
{
    public class CreateBugCommandHandler : IRequestHandler<CreateBugCommand, Bug>
    {
        private readonly IBugRepository _bugRepository;

        public CreateBugCommandHandler(IBugRepository bugRepository)
        {
            _bugRepository = bugRepository;
        }

        public async Task<Bug> Handle(CreateBugCommand request, CancellationToken cancellationToken)
        {
            var bug = new Bug(request.Title, request.Description, request.PersonId);

            _bugRepository.Create(bug);
            await _bugRepository.SaveChangesAsync(cancellationToken);

            return bug;
        }
    }
}
