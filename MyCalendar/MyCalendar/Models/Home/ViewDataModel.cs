using MyCalendar.Models.Account;
using MyCalendar.Models.Events;
using System.Collections.Generic;

namespace MyCalendar.Models.Home
{
    public class ViewDataModel
    {
        public List<UserViewModel> Users { get; set; }
        public int? CurrentUserId { get; set; }
        public List<EventViewModel> Events { get; set; }
    }
}