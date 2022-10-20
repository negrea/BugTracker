using System;
using System.Net;

namespace BugTracker.Core.ValueObjects
{
    public class BugTrackerException : Exception
    {
        public HttpStatusCode? ErrorCode { get; init; }

        public BugTrackerException(string message, HttpStatusCode? errorCode = null) : base(message)
        {
            ErrorCode = errorCode;
        }
    }
}
