using BugTracker.API;
using BugTracker.Application.Bugs.Commands;
using BugTracker.Core.Entities;
using FluentAssertions;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;
using Xunit;

namespace BugTracker.Test.Integration
{

    public class BugsControllerTests : ControllerTestBase
    {
        private readonly HttpClient _httpClient;
        public BugsControllerTests(BugTrackerApiFactory<Program> factory) : base(factory)
        {
            _httpClient = _factory.CreateClient();
        }

        [Fact]
        public async Task GetAll_ReturnsOK()
        {
            // Arrange
            SetupBug();

            // Act
            var response = await _httpClient.GetAsync("/api/bugs-management/bugs");
            var contentString = await response.Content.ReadAsStringAsync();
            var result = JsonConvert.DeserializeObject<List<Bug>>(contentString, _isoDateTimeConverter);

            // Assert
            result.Count.Should().Be(1);
            response.StatusCode.Should().Be(HttpStatusCode.OK);
        }

        [Fact]
        public async Task CreateBug_ReturnsCreated()
        {
            // Arrange
            var createBugCommand = new CreateBugCommand()
            {
                Title = "Test bug"
            };
            var request = new HttpRequestMessage(HttpMethod.Post, "/api/bugs-management/bugs")
            {
                Content = JsonContent.Create(createBugCommand)
            };

            // Act
            var response = await _httpClient.SendAsync(request);
            var contentString = await response.Content.ReadAsStringAsync();
            var result = JsonConvert.DeserializeObject<Bug>(contentString, _isoDateTimeConverter);

            // Assert
            result.Should().NotBeNull();
            response.StatusCode.Should().Be(HttpStatusCode.Created);
        }

        [Fact]
        public async Task CreateBug_ReturnsBadRequest_When_InvalidTitle()
        {
            // Arrange
            var createBugCommand = new CreateBugCommand();
            var request = new HttpRequestMessage(HttpMethod.Post, "/api/bugs-management/bugs")
            {
                Content = JsonContent.Create(createBugCommand)
            };

            // Act
            var response = await _httpClient.SendAsync(request);
            var contentString = await response.Content.ReadAsStringAsync();

            // Assert
            contentString.Should().Be("\'Title\' must not be empty.");
            response.StatusCode.Should().Be(HttpStatusCode.BadRequest);
        }

        [Fact]
        public async Task CreateBug_ReturnsBadRequest_When_InvalidPersonId()
        {
            // Arrange
            var createBugCommand = new CreateBugCommand()
            {
                Title = "Test bug",
                PersonId = Guid.NewGuid()
            };
            var request = new HttpRequestMessage(HttpMethod.Post, "/api/bugs-management/bugs")
            {
                Content = JsonContent.Create(createBugCommand)
            };

            // Act
            var response = await _httpClient.SendAsync(request);
            var contentString = await response.Content.ReadAsStringAsync();

            // Assert
            contentString.Should().Be("Person not found");
            response.StatusCode.Should().Be(HttpStatusCode.BadRequest);
        }

        private void SetupBug()
        {
            var bug = new Bug("Test bug", "Just another test bug");
            _bugTrackerContext.Add(bug);
            _bugTrackerContext.SaveChanges();
        }
    }
}
