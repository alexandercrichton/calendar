using Calendar.Data;
using Calendar.Data.Models;
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
            return RedirectToAction("Index", "Calendar").WithQuery("id", Guid.NewGuid().ToString());
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