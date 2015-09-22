using Calendar.Data.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Calendar.Data
{
    public class CalendarContext : DbContext
    {
        public CalendarContext() : base("Calendar") { }

        public DbSet<User> Users { get; set; }
        public DbSet<UserGroup> UserGroups { get; set; }
        public DbSet<UserConnection> UserConnections { get; set; }
    }
}
