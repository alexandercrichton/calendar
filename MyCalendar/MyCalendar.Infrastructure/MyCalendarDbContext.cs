using MyCalendar.Infrastructure.Model;
using System.Data.Entity;

namespace MyCalendar.Infrastructure
{
    public class MyCalendarDbContext : DbContext
    {
        public MyCalendarDbContext() : base("MyCalendar")
        {
        }

        public DbSet<Event> Events { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<UserLink> UserLinks { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder
                .Entity<UserLink>()
                .HasRequired(l => l.FromUser)
                .WithMany(u => u.UserLinksFrom)
                .HasForeignKey(l => l.FromUserId);

            modelBuilder
                .Entity<UserLink>()
                .HasRequired(l => l.ToUser)
                .WithMany(u => u.UserLinksTo)
                .HasForeignKey(l => l.ToUserId);

        }
    }
}