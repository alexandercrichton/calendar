using AutoMapper;
using MyCalendar.Common.Core;
using MyCalendar.Common.Models;
using SignalRChat.Controllers.Base;
using SignalRChat.Core;
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
            if (registerModel != null && registerModel.UserId == null)
            {
                CurrentUser = new User();
                Mapper.Map(registerModel, CurrentUser);
                CurrentUser.IsActive = true;

                Db.Users.Add(CurrentUser);
                Db.SaveChanges();

                var userModel = new UserModel();
                Mapper.Map(CurrentUser, userModel);
                return new JsonNetResult { Data = userModel };
            }

            return new JsonNetResult { Data = null };
        }

        [HttpPost]
        public JsonNetResult Logout()
        {
            UserModel userModel = null;

            var cookie = new HttpCookie(Constant.Cookie.MyCalendarUser, "");
            cookie.Expires = DateTime.Now.AddYears(-1);

            Response.Cookies.Set(cookie);

            return new JsonNetResult { Data = null };
        }

        [HttpPost]
        public JsonNetResult Login(LoginViewModel loginModel)
        {
            UserModel userModel = null;

            if (loginModel?.Email != null && loginModel.Password != null)
            {
                CurrentUser = Db.Users.FirstOrDefault(u => u.Email == loginModel.Email
                    && u.Password == loginModel.Password);
                if (CurrentUser != null)
                {
                    var cookie = new HttpCookie(Constant.Cookie.MyCalendarUser, CurrentUser.UserId.ToString());
                    Response.Cookies.Set(cookie);
                    Mapper.Map(CurrentUser, userModel);
                }
            }

            return new JsonNetResult { Data = userModel };
        }
    }
}