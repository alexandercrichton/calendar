using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace MyCalendar.Infrastructure.Model
{
    public class User
    {
        [Key]
        public int? UserId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }

        public virtual ICollection<UserLink> UserLinksTo { get; set; }

        public virtual ICollection<UserLink> UserLinksFrom { get; set; }

        public virtual ICollection<Event> Events { get; set; }
    }
}