using MyCalendar.Common.Models;
using System.Data.Entity;

namespace MyCalendar.Common
{
    public class CalendarContext : DbContext
    {
        public CalendarContext() : base("Calendar")
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<UserConnection> UserConnections { get; set; }
        public DbSet<View> Calendars { get; set; }
        public DbSet<Event> Events { get; set; }
    }
}