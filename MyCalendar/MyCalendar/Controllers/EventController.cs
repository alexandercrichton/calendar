using MyCalendar.Infrastructure;
using MyCalendar.Infrastructure.Model;
using MyCalendar.Models;
using MyCalendar.Models.Events;
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
    }
}