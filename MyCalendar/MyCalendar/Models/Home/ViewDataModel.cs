using MyCalendar.Models.Account;
using System.Collections.Generic;

namespace MyCalendar.Models.Home
{
    public class ViewDataModel
    {
        public List<UserViewModel> Users { get; set; }
        public int? CurrentUserId { get; set; }
    }
}