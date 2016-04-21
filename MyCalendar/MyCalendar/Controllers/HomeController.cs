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
                var currentUser = db.Users.FirstOrDefault(u => u.UserId == userId);
                var users = db.Users
                    .Where(u => u.UserId == currentUser.UserId
                        || db.UserLinks
                            .Any(l => l.FromUserId == currentUser.UserId && l.ToUserId == u.UserId))
                    .ToList();
                var model = new ViewDataModel
                {
                    Users = users.Select(u => new UserViewModel(u)).ToList(),
                    CurrentUserId = currentUser.UserId
                };
                return StrongJsonResult.From(model);
            }
        }
    }
}