using AutoMapper;
using MyCalendar.Common.Core;
using MyCalendar.Common.Models;
using SignalRChat.Controllers.Base;
using SignalRChat.Models.User;
using System;
using System.Web;
using System.Web.Mvc;

namespace SignalRChat.Controllers
{
    public class UserController : BaseUserController
    {
        public JsonResult Current()
        {
            if (CurrentUser != null)
            {
                var userModel = Mapper.Map<UserModel>(CurrentUser);
                var json = Json(userModel, JsonRequestBehavior.AllowGet);
                return json;
            }

            return null;
        }

        [HttpPost]
        public JsonResult Register(RegisterModel registerModel)
        {
            UserModel userModel = null;

            if (registerModel != null && CurrentUser != null
                && registerModel.UserId == CurrentUser.UserId && !CurrentUser.IsActive)
            {
                {
                    CurrentUser = Mapper.Map<User>(registerModel);
                    CurrentUser.IsActive = true;

                    Db.SaveChanges();

                    userModel = Mapper.Map<UserModel>(CurrentUser);
                }
            }

            return Json(userModel);
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
            if (CurrentUser?.Email == loginModel.Email && CurrentUser?.Password == loginModel.Password)
            {
                var cookie = new HttpCookie(Constant.Cookie.MyCalendarUser, CurrentUser.UserId.ToString());
                Response.Cookies.Set(cookie);
                return RedirectToAction("Index", "Calendar");
            }

            return RedirectToAction("Index", "Calendar");
        }
    }
}