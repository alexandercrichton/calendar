using AutoMapper;
using MyCalendar.Common.Core;
using SignalRChat.Controllers.Base;
using SignalRChat.Models.User;
using System;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SignalRChat.Controllers
{
    public class UserController : BaseUserController
    {
        public JsonResult Current()
        {
            var user = Db.Users.FirstOrDefault(u => u.UserId == CurrentUserId);
            var userModel = Mapper.Map<UserModel>(user);
            var json = Json(userModel, JsonRequestBehavior.AllowGet);
            return json;
        }

        [HttpPost]
        public bool Register(RegisterModel registerModel)
        {
            if (registerModel != null)
            {
                if (CurrentUserId.HasValue)
                {
                    var user = Db.Users.FirstOrDefault(u => u.UserId == CurrentUserId);
                    if (user != null)
                    {
                        user.Name = registerModel.Name;
                        user.Password = registerModel.Password;
                        user.IsActive = true;

                        Db.SaveChanges();
                    }
                }

                return true;
            }

            return false;
        }

        public ActionResult Logout()
        {
            var cookie = new HttpCookie(Constant.Cookie.MyCalendarUser, "");
            cookie.Expires = DateTime.Now.AddYears(-1);

            Response.Cookies.Set(cookie);

            return RedirectToAction("Index", "Calendar");
        }

        public ActionResult Login(LoginViewModel loginModel)
        {
            var user = Db.Users.FirstOrDefault(u => u.Email == loginModel.Email
                && u.Password == loginModel.Password);
            if (user != null)
            {
                var cookie = new HttpCookie(Constant.Cookie.MyCalendarUser, user.UserId.ToString());
                Response.Cookies.Set(cookie);
                return RedirectToAction("Index", "Calendar");
            }

            return RedirectToAction("Index", "Calendar");
        }
    }
}