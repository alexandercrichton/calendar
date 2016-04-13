using MyCalendar.Infrastructure;
using System.Linq;
using System.Web.Mvc;

namespace MyCalendar.Controllers
{
    public class LoginController : Controller
    {
        // GET: Login
        public ActionResult Index()
        {
            using (var db = new MyCalendarDbContext())
            {
                var user = db.Users.FirstOrDefault();
                db.Users.Add(new Infrastructure.Model.User
                {
                    Name = "2",
                    Email = "2",
                    Password = "2"
                });
                return View();
            }
        }
    }
}