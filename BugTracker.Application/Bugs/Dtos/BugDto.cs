namespace BugTracker.Application.Bugs.DTOs
{
    public class BugDto
    {
        public string Id { get; set; }
        public string CreationDate { get; set; }
        public string ModifiedDate { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Status { get; set; }
        public string PersonId { get; set; }
        public string PersonName { get; set; }
    }
}
