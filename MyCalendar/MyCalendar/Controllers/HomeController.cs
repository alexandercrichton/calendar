using MyCalendar.Infrastructure;
using MyCalendar.Models;
using MyCalendar.Models.Account;
using MyCalendar.Models.Home;
using System.Linq;
using System.Web.Mvc;

namespace MyCalendar.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public StrongJsonResult<ViewDataModel> GetViewData(int? userId)
        {
            using (var db = new MyCalendarDbContext())
            {
                var data = db.Users
                    .Where(u => u.UserId == userId
                        || u.UserLinks
                            .Any(l => l.FromUserId == userId && l.ToUserId == u.UserId))
                    .Select(u => new
                    {
                        User = u,
                        Events = u.Events
                    });

                var viewModels = data
                    .Select(d => new UserViewModel(d.User, d.Events))
                    .ToList();

                var model = new ViewDataModel
                {
                    Users = viewModels,
                    CurrentUserId = userId
                };
                return StrongJsonResult.From(model);
            }
        }
    }
}