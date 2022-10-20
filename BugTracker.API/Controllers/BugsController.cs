using BugTracker.Application.Bugs.Commands;
using BugTracker.Application.Bugs.DTOs;
using BugTracker.Application.Bugs.Queries;
using BugTracker.Core.Entities;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace BugTracker.API.Controllers
{
    [ApiController]
    [Route("api/bugs-management")]
    public class BugsController : ControllerBase
    {
        private readonly IMediator _mediator;

        public BugsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        /// <summary>
        /// Gets all the Bugs
        /// </summary>
        /// <returns>A list of Bugs</returns>
        /// <response code="200">Returns the list of Bugs</response>
        [HttpGet("bugs")]
        [Produces("application/json")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<List<BugDto>>> GetAll()
        {
            var bugs = await _mediator.Send(new GetBugsQuery());
            return Ok(bugs);
        }

        /// <summary>
        /// Creates a Bug
        /// </summary>
        /// <returns>A newly created Bug</returns>
        /// <response code="201">Returns the newly created Bug</response>
        /// <response code="400">If the bug has an invalid Title, Description or PersonId</response>
        [HttpPost("bugs")]
        [Produces("application/json")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Bug>> CreateBug(CreateBugCommand request)
        {
            var bug = await _mediator.Send(request);
            return CreatedAtAction(nameof(CreateBug), bug);
        }

        /// <summary>
        /// Updates a Bug
        /// </summary>
        /// <returns>A recently updated Bug</returns>
        /// <response code="200">Returns the recently updated Bug</response>
        /// <response code="400">If the Bug has an invalid Id, Title, Description or Status</response>
        /// <response code="404">If the Bug is not found</response>
        [HttpPatch("bugs")]
        [Produces("application/json")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Bug>> UpdateBug(UpdateBugCommand request)
        {
            var bug = await _mediator.Send(request);
            return Ok(bug);
        }
    }
}