using BugTracker.Application.Bugs.Commands;
using BugTracker.Core.Entities;
using FluentValidation;

namespace BugTracker.Application.Bugs.Validators
{
    public class UpdateBugCommandValidator : AbstractValidator<UpdateBugCommand>
    {
        public UpdateBugCommandValidator()
        {
            RuleFor(b => b.Id).NotEmpty();
            RuleFor(b => b.Title).NotEmpty();
            RuleFor(b => b.Status).NotNull().Must((b, s) =>
                (s == BugStatus.Unassigned || s == BugStatus.Closed)
                    ? b.PersonId == null
                    : b.PersonId != null);
        }
    }
}
