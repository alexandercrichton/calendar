﻿using MyCalendar.Infrastructure;
using MyCalendar.Infrastructure.Model;
using MyCalendar.Models;
using MyCalendar.Models.Login;
using System.Linq;
using System.Web.Mvc;

namespace MyCalendar.Controllers
{
    public class LoginController : Controller
    {
        public StrongJsonResult<int?> Register(RegisterModel model)
        {
            using (var db = new MyCalendarDbContext())
            {
                var user = new User
                {
                    Name = model.Name,
                    Email = model.Email,
                    Password = model.Password
                };

                db.Users.Add(user);
                db.SaveChanges();

                return StrongJsonResult.From(user.UserId);
            }
        }

        public StrongJsonResult<int?> Login(LoginModel model)
        {
            using (var db = new MyCalendarDbContext())
            {
                var user = db.Users.FirstOrDefault(u => u.Email == model.Email && u.Password == model.Password);
                return StrongJsonResult.From(user?.UserId);
            }
        }
    }
}