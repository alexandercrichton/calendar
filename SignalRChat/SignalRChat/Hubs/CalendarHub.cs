using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using MyCalendar.Common;
using MyCalendar.Common.Core;
using MyCalendar.Common.Extensions;
using MyCalendar.Common.Models;
using System;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace MyCalendar.Hubs
{
    public static class HubExtensions
    {
        public static T OthersInCurrentCalendar<T>(this IHubCallerConnectionContext<T> hub)
        {
            var calendarGuid = HttpContext.Current.Request.QueryString["id"];
            return hub.OthersInGroup(calendarGuid);
        }
    }

    public class CalendarHub : Hub<ICalendarClient>
    {
        public CalendarHub()
        {
            Db = new CalendarContext();
        }

        protected CalendarContext Db { get; set; }

        protected Guid CurrentCalendarGuid
        {
            get { return Guid.Parse(Context.QueryString["id"]); }
        }

        protected HttpRequest Request
        {
            get { return HttpContext.Current.Request; }
        }

        protected HttpResponse Response
        {
            get { return HttpContext.Current.Response; }
        }

        protected int? CurrentUserId
        {
            get { return Request.Cookies[Constant.Cookie.MyCalendarUser].Value.ToInt(); }
        }

        public bool ConnectToCalendar(int calendarId)
        {
            //if (CurrentUserId.HasValue)
            //{
            //    Groups.Add(Context.ConnectionId, calendarId.ToString());

            //    var user = Db.Users.FirstOrDefault(u => u.UserId == CurrentUserId.Value);
            //    if (user != null)
            //    {
            //        Clients.OthersInCurrentCalendar().AddUser(user);

            //        var calendarUsers = Db.Users
            //            .Where(u => u.UserConnections
            //                .Any(uc => uc.CalendarGuid == calendarId))
            //            .ToList();

            //        Clients.Caller.SetCurrentUser(user);
            //        Clients.Caller.AddUsers(calendarUsers);

            //        var userConnection = new UserConnection
            //        {
            //            CalendarGuid = calendarId,
            //            ConnectionId = Guid.Parse(Context.ConnectionId),
            //            UserGuid = user.UserGuid
            //        };
            //        Db.UserConnections.Add(userConnection);

            //        Db.SaveChanges();

            //        var userCalendarEvents = calendarUsers
            //            .SelectMany(cu => cu.CalendarEvents)
            //            .ToList();

            //        Clients.Caller.AddEvents(userCalendarEvents);

            //        return true;
            //    }
            //}

            return false;
        }

        public async Task SendMessage(Guid userGuid, string message)
        {
            Clients.OthersInCurrentCalendar().AddMessage(userGuid, message);
        }

        public async Task AddEvent(Event calendarEvent)
        {
            Clients.OthersInCurrentCalendar().AddEvent(calendarEvent);

            Db.Events.Add(calendarEvent);

            Db.SaveChanges();
        }

        public async Task UpdateEvent(Event updatedCalendarEvent)
        {
            Clients.OthersInCurrentCalendar().UpdateEvent(updatedCalendarEvent);

            var calendarEvent = Db.Events.FirstOrDefault(
                ce => ce.EventId == updatedCalendarEvent.EventId);
            Db.Entry(calendarEvent).CurrentValues.SetValues(updatedCalendarEvent);
            await Db.SaveChangesAsync();
        }

        public async Task RemoveEvent(Guid eventGuid)
        {
            Clients.OthersInCurrentCalendar().RemoveEvent(eventGuid);
        }

        public override Task OnDisconnected(bool stopCalled)
        {
            var group = Context.QueryString["id"];
            var guid = Guid.Parse(Context.ConnectionId);
            var userConnection = Db.UserConnections
                .FirstOrDefault(uc => uc.ConnectionId == guid);

            Clients.OthersInGroup(group).UserDisconnected(userConnection.UserGuid);

            Db.UserConnections.Remove(userConnection);
            Db.SaveChanges();

            return base.OnDisconnected(stopCalled);
        }
    }
}