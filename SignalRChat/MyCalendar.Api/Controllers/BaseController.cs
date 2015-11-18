using MyCalendar.Common;
using System.Web.Http;

namespace MyCalendar.Api.Controllers
{
    public class BaseController : ApiController
    {
        protected CalendarContext Db { get; set; }

        public BaseController()
        {
            Db = new CalendarContext();
        }
    }
}