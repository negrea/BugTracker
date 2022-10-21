using System.Collections.Generic;

namespace BugTracker.Core.Entities
{
    public class Person : BaseEntity
    {
        public string FirstName { get; init; }
        public string LastName { get; init; }
        public virtual List<Bug> Bugs { get; set; }

        public Person(string firstName, string lastName)
        {
            FirstName = firstName;
            LastName = lastName;
        }

    }
}
