using AutoMapper;
using MyCalendar.Common.Models;
using SignalRChat.Models.User;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace MyCalendar
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);

            Mapper.CreateMap<User, UserModel>();
            Mapper.CreateMap<RegisterModel, User>();
            Mapper.CreateMap<User, RegisterModel>();
        }
    }
}