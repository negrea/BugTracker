using BugTracker.Application.Interfaces;
using BugTracker.Application.People.Commands;
using FluentValidation;
using System.Net;

namespace BugTracker.Application.People.Validators
{
    public class UpdatePersonCommandValidator : AbstractValidator<UpdatePersonCommand>
    {
        private readonly IPersonRepository _personRepository;

        public UpdatePersonCommandValidator(IPersonRepository personRepository)
        {
            _personRepository = personRepository;

            RuleFor(c => c.Id).NotEmpty().MustAsync(async (id, cancellationToken) =>
            {
                var person = await _personRepository.GetAsync(id, cancellationToken);
                return person != null;
            }).WithMessage("Person not found.").WithErrorCode(HttpStatusCode.NotFound.ToString());
            RuleFor(c => c.FirstName).NotEmpty();
            RuleFor(c => c.LastName).NotEmpty();
            When(c => !string.IsNullOrEmpty(c.FirstName) && !string.IsNullOrEmpty(c.LastName), () =>
            {
                RuleFor(c => new { c.FirstName, c.LastName }).MustAsync(async (name, cancellationToken) =>
                {
                    var person = await _personRepository.GetAsync(name.FirstName, name.LastName, cancellationToken);
                    return person == null;
                }).WithMessage("A person with that name already exists.");
            });
        }
    }
}
