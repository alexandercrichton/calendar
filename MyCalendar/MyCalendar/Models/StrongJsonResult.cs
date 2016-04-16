using System.Web.Mvc;

namespace MyCalendar.Models
{
    public class StrongJsonResult : JsonResult
    {
        public static StrongJsonResult<T> From<T>(T data,
            JsonRequestBehavior behavior = JsonRequestBehavior.AllowGet)
        {
            return new StrongJsonResult<T>(data, behavior);
        }
    }

    public class StrongJsonResult<T> : StrongJsonResult
    {
        public StrongJsonResult(T data, JsonRequestBehavior behavior = JsonRequestBehavior.AllowGet)
        {
            Data = data;
            JsonRequestBehavior = behavior;
        }

        public T GetData()
        {
            return (T)Data;
        }


    }
}