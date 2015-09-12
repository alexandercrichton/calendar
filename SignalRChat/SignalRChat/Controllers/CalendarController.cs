using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace SignalRChat.Controllers
{
    public class CalendarController : Controller
    {
        // GET: Calendar
        public ActionResult Index(string id)
        {
            if (id == null)
            {
                return RedirectToAction("Index", "Home");
            }

            return View();
        }

        public ActionResult Create()
        {
            var i = new Random().Next(0, 1000);
            return RedirectToAction("Index", "Calendar").WithQuery("id", i.ToString());
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