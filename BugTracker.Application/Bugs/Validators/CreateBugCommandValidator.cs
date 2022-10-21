using BugTracker.Application.Bugs.Commands;
using BugTracker.Application.Interfaces;
using FluentValidation;

namespace BugTracker.Application.Bugs.Validators
{
    public class CreateBugCommandValidator : AbstractValidator<CreateBugCommand>
    {
        private readonly IPersonRepository _personRepository;

        public CreateBugCommandValidator(IPersonRepository personRepository)
        {
            _personRepository = personRepository;

            RuleFor(c => c.Title).NotEmpty();
            When(c => c.PersonId != null, () =>
            {
                RuleFor(c => c.PersonId).MustAsync(async (personId, cancellationToken) =>
                {
                    var person = await _personRepository.GetAsync(personId.Value, cancellationToken);
                    return person != null;
                }).WithMessage("Person not found");
            });
        }
    }
}
