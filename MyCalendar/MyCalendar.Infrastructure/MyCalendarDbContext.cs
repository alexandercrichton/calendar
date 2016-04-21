using MyCalendar.Infrastructure.Model;
using System.Data.Entity;

namespace MyCalendar.Infrastructure
{
    public class MyCalendarDbContext : DbContext
    {
        public MyCalendarDbContext() : base("MyCalendar")
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<UserLink> UserLinks { get; set; }
    }
}