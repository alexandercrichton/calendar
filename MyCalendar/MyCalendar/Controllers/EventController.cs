using MyCalendar.Infrastructure;
using MyCalendar.Infrastructure.Model;
using MyCalendar.Models;
using MyCalendar.Models.Events;
using System.Linq;
using System.Web.Mvc;

namespace MyCalendar.Controllers
{
    public class EventController : Controller
    {
        public StrongJsonResult<EventViewModel> AddEvent(EventViewModel model)
        {
            using (var db = new MyCalendarDbContext())
            {
                var evnt = new Event();
                model.WriteTo(evnt);
                db.Events.Add(evnt);
                db.SaveChanges();
                return StrongJsonResult.From(new EventViewModel(evnt));
            }
        }

        public StrongJsonResult<int?> RemoveEvent(int? eventId)
        {
            using (var db = new MyCalendarDbContext())
            {
                var evnt = db.Events.FirstOrDefault(e => e.EventId == eventId);
                db.Events.Remove(evnt);
                db.SaveChanges();
                return StrongJsonResult.From(eventId);
            }
        }
    }
}