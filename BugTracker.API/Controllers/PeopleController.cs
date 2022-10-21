using BugTracker.Application.People.Commands;
using BugTracker.Application.People.Queries;
using BugTracker.Core.Entities;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BugTracker.API.Controllers
{
    [ApiController]
    [Route("api/people-management")]
    public class PeopleController : ControllerBase
    {
        private readonly IMediator _mediator;

        public PeopleController(IMediator mediator)
        {
            _mediator = mediator;
        }

        /// <summary>
        /// Gets all the People.
        /// </summary>
        /// <returns>A list of People</returns>
        /// <response code="200">Returns the list of People</response>
        [HttpGet("people")]
        [Produces("application/json")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<List<Person>>> GetAll()
        {
            var people = await _mediator.Send(new GetPeopleQuery());
            return Ok(people);
        }

        /// <summary>
        /// Creates a Person.
        /// </summary>
        /// <returns>A newly created Person</returns>
        /// <response code="201">Returns the newly created Person</response>
        /// <response code="400">If a Person has an invalid FirstName, LastName or another Person with that name already exists</response>
        [HttpPost("people")]
        [Produces("application/json")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Person>> CreatePerson(CreatePersonCommand request)
        {
            var person = await _mediator.Send(request);
            return CreatedAtAction(nameof(CreatePerson), person);
        }

        /// <summary>
        /// Updates a Bug.
        /// </summary>
        /// <returns>A recently updated Person</returns>
        /// <response code="200">Returns the recently updated Person</response>
        /// <response code="400">If the Person has an invalid Id, FirstName, LastName or another Person with that name already exists</response>
        /// <response code="404">If the Person is not found</response>
        [HttpPatch("people")]
        [Produces("application/json")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Person>> UpdatePerson(UpdatePersonCommand request)
        {
            var person = await _mediator.Send(request);
            return Ok(person);
        }
    }
}