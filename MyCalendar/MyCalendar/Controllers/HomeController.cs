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
                var users = db.Users
                    .Where(u => u.UserId == userId
                        || u.UserLinksTo
                            .Any(l => l.FromUserId == userId))
                    .ToList();

                var data = users
                    .Select(u => new
                    {
                        User = u,
                        Events = u.Events
                    })
                    .ToList();

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