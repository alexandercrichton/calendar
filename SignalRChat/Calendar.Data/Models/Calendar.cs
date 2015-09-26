using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyCalendar.Data.Models
{
    public class Calendar
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid CalendarGuid { get; set; }

        public string Name { get; set; }

        [JsonIgnore]
        public virtual ICollection<UserConnection> UserConnections { get; set; }

        [JsonIgnore]
        public virtual ICollection<CalendarEvent> CalendarEvents { get; set; }
    }
}
