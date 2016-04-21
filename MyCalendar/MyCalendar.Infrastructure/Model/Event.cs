using System;
using System.ComponentModel.DataAnnotations;

namespace MyCalendar.Infrastructure.Model
{
    public class Event
    {
        [Key]
        public int? EventId { get; set; }
        public int? UserId { get; set; }
        public string Title { get; set; }
        public DateTime? StartTime { get; set; }
        public DateTime? EndTime { get; set; }
    }
}
