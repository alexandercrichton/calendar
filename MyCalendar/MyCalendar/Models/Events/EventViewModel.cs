using MyCalendar.Core;
using MyCalendar.Infrastructure.Model;

namespace MyCalendar.Models.Events
{
    public class EventViewModel
    {
        public EventViewModel() { }

        public EventViewModel(Event evnt)
        {
            EventId = evnt.EventId;
            UserId = evnt.UserId;
            Title = evnt.Title;
            StartTime = evnt.StartTime?.ToString("yyyy-MM-dd");
            EndTime = evnt.EndTime?.ToString("yyyy-MM-dd");
        }

        public int? EventId { get; set; }
        public int? UserId { get; set; }
        public string Title { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }

        public void WriteTo(Event evnt)
        {
            evnt.EventId = EventId;
            evnt.UserId = UserId;
            evnt.Title = Title;
            evnt.StartTime = StartTime.ToDateTime();
            evnt.EndTime = EndTime.ToDateTime();
        }
    }
}