using BugTracker.Application.Interfaces;
using BugTracker.Application.People.Commands;
using FluentValidation;

namespace BugTracker.Application.People.Validators
{
    public class CreatePersonCommandValidator : AbstractValidator<CreatePersonCommand>
    {
        private readonly IPersonRepository _personRepository;

        public CreatePersonCommandValidator(IPersonRepository personRepository)
        {
            _personRepository = personRepository;

            RuleFor(c => c.FirstName).NotEmpty();
            RuleFor(c => c.LastName).NotEmpty();
            When(c => !string.IsNullOrEmpty(c.FirstName) && !string.IsNullOrEmpty(c.LastName), () =>
            {
                RuleFor(c => new { c.FirstName, c.LastName }).MustAsync(async (name, cancellationToken) =>
                {
                    var duplicatePerson = await _personRepository.GetByNameAsync(name.FirstName, name.LastName, cancellationToken);
                    return duplicatePerson == null;
                }).WithMessage("A person with that name already exists.");
            });
        }
    }
}
