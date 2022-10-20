using BugTracker.Application.Bugs.Commands;
using FluentValidation;

namespace BugTracker.Application.Bugs.Validators
{
    public class CreateBugCommandValidator : AbstractValidator<CreateBugCommand>
    {
        public CreateBugCommandValidator()
        {
            RuleFor(c => c.Title).NotEmpty();
        }
    }
}
