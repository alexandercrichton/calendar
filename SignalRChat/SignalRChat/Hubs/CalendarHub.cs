using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using MyCalendar.Data;
using MyCalendar.Data.Models;
using System;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace SignalRChat.Hubs
{
    public class CalendarHub : Hub<ICalendarClient>
    {
        protected CalendarContext Db { get; set; }

        protected Guid CurrentCalendarGuid
        {
            get { return Guid.Parse(Context.QueryString["id"]); }
        }

        public CalendarHub()
        {
            Db = new CalendarContext();
        }

        public void ConnectToCalendar(string userName, Guid calendarGuid)
        {
            Groups.Add(Context.ConnectionId, calendarGuid.ToString());

            var user = new User
            {
                Name = userName
            };
            Db.Users.Add(user);

            Db.SaveChanges();

            Clients.OthersInCurrentCalendar().AddUser(user);

            var calendarUsers = Db.Users
                .Where(u => u.UserConnections
                    .Any(uc => uc.CalendarGuid == calendarGuid))
                .ToList();

            Clients.Caller.SetCurrentUser(user);
            Clients.Caller.AddUsers(calendarUsers);

            var userConnection = new UserConnection
            {
                CalendarGuid = calendarGuid,
                ConnectionId = Guid.Parse(Context.ConnectionId),
                UserGuid = user.UserGuid
            };
            Db.UserConnections.Add(userConnection);

            Db.SaveChanges();

            var userCalendarEvents = calendarUsers
                .SelectMany(cu => cu.CalendarEvents)
                .ToList();

            Clients.Caller.AddExistingEvents(userCalendarEvents);
        }

        public async Task SendMessage(Guid userGuid, string message)
        {
            Clients.OthersInCurrentCalendar().AddMessage(userGuid, message);
        }

        public async Task DayClicked(string start)
        {
            Clients.Others.NewSelection(start, null);
        }

        public async Task AddEvent(CalendarEvent calendarEvent)
        {
            Clients.OthersInCurrentCalendar().AddEvent(calendarEvent);

            Db.CalendarEvents.Add(calendarEvent);

            Db.SaveChanges();
        }

        public async Task UpdateEvent(CalendarEvent calendarEvent)
        {
            Clients.OthersInCurrentCalendar().UpdateEvent(calendarEvent);
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

        protected class FullCalendarEvent
        {
            public string id { get; set; }

        }
    }

    public static class HubExtensions
    {
        public static T OthersInCurrentCalendar<T>(this IHubCallerConnectionContext<T> hub)
        {
            var calendarGuid = HttpContext.Current.Request.QueryString["id"];
            return hub.OthersInGroup(calendarGuid);
        }
    }
}