using BugTracker.Core.ValueObjects;
using FluentValidation;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using System.Linq;
using System.Net;

namespace BugTracker.API.Extensions
{
    public static class WebApplicationExtensions
    {
        public static IApplicationBuilder UseSwashbuckle(this IApplicationBuilder app)
        {
            app.UseSwagger();
            app.UseSwaggerUI(options =>
            {
                options.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");
                options.RoutePrefix = string.Empty;
            });
            return app;
        }

        public static void RunExceptionHandler(this IApplicationBuilder app)
        {
            app.Run(async context =>
            {
                string errorMessage = "An unexpected error occurred";

                context.Response.ContentType = "application/json";
                context.Response.StatusCode = StatusCodes.Status500InternalServerError;

                var exceptionHandlerPathFeature =
                    context.Features.Get<IExceptionHandlerPathFeature>();

                if (exceptionHandlerPathFeature != null)
                {
                    var exception = exceptionHandlerPathFeature.Error;
                    if (exception is BugTrackerException bugTrackerException)
                    {
                        context.Response.StatusCode = bugTrackerException.ErrorCode switch
                        {
                            HttpStatusCode.NotFound => StatusCodes.Status404NotFound,
                            _ => StatusCodes.Status500InternalServerError,
                        };
                        errorMessage = exception.Message;
                    }
                    if (exception is ValidationException validationException)
                    {
                        var validationFailure = validationException.Errors.FirstOrDefault();
                        context.Response.StatusCode = validationFailure.ErrorCode switch
                        {
                            nameof(HttpStatusCode.NotFound) => StatusCodes.Status404NotFound,
                            _ => StatusCodes.Status400BadRequest,
                        };
                        errorMessage = validationFailure.ErrorMessage;
                    }
                }
                await context.Response.WriteAsync(errorMessage);
            });
        }
    }
}
