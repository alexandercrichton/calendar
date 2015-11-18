using MyCalendar.Common;
using MyCalendar.Common.Core;
using MyCalendar.Common.Extensions;
using MyCalendar.Common.Models;
using System.Web;
using System.Web.Mvc;

namespace SignalRChat.Controllers.Base
{
    public class BaseUserController : Controller
    {
        protected CalendarContext Db { get; set; }

        protected int? CurrentUserId { get; set; }

        public BaseUserController()
        {
            Db = new CalendarContext();
        }

        protected override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            base.OnActionExecuting(filterContext);

            var cookie = Request.Cookies[Constant.Cookie.MyCalendarUser];
            if (cookie != null)
            {
                CurrentUserId = cookie.Value.ToInt();
            }

            if (!CurrentUserId.HasValue)
            {
                var user = new User();
                Db.Users.Add(user);
                Db.SaveChanges();
                Response.Cookies.Add(new HttpCookie(Constant.Cookie.MyCalendarUser, user.UserId.ToString()));
            }
        }
    }
}