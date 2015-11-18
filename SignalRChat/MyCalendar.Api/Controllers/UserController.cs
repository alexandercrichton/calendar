using MyCalendar.Common.Extensions;
using MyCalendar.Common.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace MyCalendar.Api.Controllers
{
    public class UserController : BaseController
    {
        // GET api/values
        public IEnumerable<User> Get()
        {
            return Db.Users.Take(5);
        }

        // GET api/values/5
        public User Get(Guid guid)
        {
            return Db.Users.FirstOrDefault(u => u.UserGuid == guid);
        }

        // POST api/values
        public void Post([FromBody]User user)
        {
            Db.InsertOrUpdate(user, u => u.UserGuid);
        }

        // PUT api/values/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
        }
    }
}