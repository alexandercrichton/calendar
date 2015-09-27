using Newtonsoft.Json;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyCalendar.Data.Models
{
    public class CalendarEvent
    {
        [Key]
        public Guid CalendarEventGuid { get; set; }

        public Guid CalendarGuid { get; set; }

        public Guid UserGuid { get; set; }

        public DateTime StartDateTime { get; set; }

        public DateTime? EndDateTime { get; set; }

        public string Name { get; set; }

        [JsonIgnore]
        public virtual Calendar Calendar { get; set; }

        [JsonIgnore]
        public virtual User User { get; set; }
    }
}
