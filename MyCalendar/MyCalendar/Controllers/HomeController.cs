using MyCalendar.Infrastructure;
using MyCalendar.Models;
using MyCalendar.Models.Home;
using MyCalendar.Models.User;
using System.Collections.Generic;
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
                var model = new ViewDataModel
                {
                    Users = new List<UserViewModel> { new UserViewModel(currentUser) }
                };
                return StrongJsonResult.From(model);
            }
        }
    }
}