using MyCalendar.Common.Models;
using SignalRChat.Controllers.Base;
using System.Web.Mvc;

namespace MyCalendar.Controllers
{
    public class CalendarController : BaseUserController
    {
        public ActionResult Index(string id)
        {
            //if (id == null)
            //{
            //    return RedirectToAction("Index", "Home");
            //}

            return View();
        }

        //public ActionResult Create()
        //{
        //    var calendar = new View
        //    {
        //        Name = string.Empty
        //    };
        //    Db.Calendars.Add(calendar);
        //    Db.SaveChanges();

        //    return RedirectToAction("Index", "Calendar").WithQuery("id", calendar.ViewId.ToString());
        //}

        [HttpPost]
        public ActionResult Create(Event ev)
        {
            if (ev != null)
            {
                Db.Events.Add(ev);
                Db.SaveChanges();
            }

            return Json(ev);
        }
    }
}

public static class RedirectToRouteExtensions
{
    public static RedirectToRouteResult WithQuery(this RedirectToRouteResult redirectResult, string name, string val)
    {
        redirectResult.RouteValues.Add(name, val);
        return redirectResult;
    }

    public static RedirectToRouteResult And(this RedirectToRouteResult redirectResult, string name, string val)
    {
        return redirectResult.WithQuery(name, val);
    }
}