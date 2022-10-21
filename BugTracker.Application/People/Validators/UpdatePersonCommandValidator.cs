using BugTracker.Application.Interfaces;
using BugTracker.Application.People.Commands;
using FluentValidation;

namespace BugTracker.Application.People.Validators
{
    public class UpdatePersonCommandValidator : AbstractValidator<UpdatePersonCommand>
    {
        private readonly IPersonRepository _personRepository;

        public UpdatePersonCommandValidator(IPersonRepository personRepository)
        {
            _personRepository = personRepository;

            RuleFor(c => c.Id).NotEmpty();
            RuleFor(c => c.FirstName).NotEmpty();
            RuleFor(c => c.LastName).NotEmpty();
            When(c => !string.IsNullOrEmpty(c.FirstName) && !string.IsNullOrEmpty(c.LastName), () =>
            {
                RuleFor(c => new { c.FirstName, c.LastName }).MustAsync(async (name, cancellationToken) =>
                {
                    var person = await _personRepository.GetByNameAsync(name.FirstName, name.LastName, cancellationToken);
                    return person == null;
                }).WithMessage("A person with that name already exists.");
            });
        }
    }
}
