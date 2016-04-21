using MyCalendar.Infrastructure;
using MyCalendar.Infrastructure.Model;
using MyCalendar.Models;
using MyCalendar.Models.Account;
using MyCalendar.Models.Login;
using System.Linq;
using System.Web.Mvc;

namespace MyCalendar.Controllers
{
    public class AccountController : Controller
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

        public StrongJsonResult<int?> UpdateUser(UserViewModel userModel)
        {
            using (var db = new MyCalendarDbContext())
            {
                var user = db.Users.FirstOrDefault(u => u.UserId == userModel.UserId);
                if (user != null)
                {
                    userModel.WriteTo(user);
                    db.SaveChanges();
                }

                return StrongJsonResult.From(user?.UserId);
            }
        }

        public StrongJsonResult<UserViewModel> LinkUserToUserByEmail(int? fromUserId, string toEmail)
        {
            using (var db = new MyCalendarDbContext())
            {
                var fromUser = db.Users.FirstOrDefault(u => u.UserId == fromUserId);
                if (fromUser != null)
                {
                    var toUser = db.Users.FirstOrDefault(u => u.Email == toEmail && u.UserId != fromUser.UserId);
                    if (toUser != null)
                    {
                        var link = db.UserLinks.FirstOrDefault(l => l.FromUserId == fromUserId
                            && l.ToUserId == toUser.UserId);
                        if (link == null)
                        {
                            link = new UserLink(fromUserId, toUser.UserId);
                            db.UserLinks.Add(link);
                            db.SaveChanges();
                            return StrongJsonResult.From(new UserViewModel(toUser));
                        }
                    }
                }

                return null;
            }
        }

        public StrongJsonResult<int?> UnlinkUserFromUser(int? fromUserId, int? toUserId)
        {
            using (var db = new MyCalendarDbContext())
            {
                var link = db.UserLinks.FirstOrDefault(l => l.FromUserId == fromUserId
                    && l.ToUserId == toUserId);
                if (link != null)
                {
                    db.UserLinks.Remove(link);
                    db.SaveChanges();
                    return StrongJsonResult.From(link.UserLinkId);
                }

                return null;
            }
        }
    }
}