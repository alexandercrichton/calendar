using MyCalendar.Infrastructure.Model;
using MyCalendar.Models.Events;
using System.Collections.Generic;
using System.Linq;

namespace MyCalendar.Models.Account
{
    public class UserViewModel
    {
        public UserViewModel() { }

        public UserViewModel(User user, ICollection<Event> events)
        {
            UserId = user.UserId;
            Name = user.Name;
            Email = user.Email;
            Events = events
                .Select(e => new EventViewModel(e))
                .ToList();
        }

        public int? UserId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }

        public List<EventViewModel> Events { get; set; } = new List<EventViewModel>();
    }
}