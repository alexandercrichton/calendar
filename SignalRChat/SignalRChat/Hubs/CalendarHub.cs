﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using System.Threading.Tasks;
using Microsoft.AspNet.SignalR.Hubs;
using System.Web.SessionState;
using MyCalendar.Data;
using MyCalendar.Data.Models;

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
        }

        public async Task SendMessage(Guid userGuid, string message)
        {
            Clients.OthersInCurrentCalendar().AddMessage(userGuid, message);
        }

        public async Task DayClicked(string start)
        {
            Clients.Others.NewSelection(start, null);
        }

        public async Task AddEvent(Guid eventGuid, Guid userGuid, string start, string end)
        {
            Clients.OthersInCurrentCalendar().AddEvent(eventGuid, userGuid, start, end);

            DateTime d;
            DateTime? endDate = null;
            if (DateTime.TryParse(end, out d))
            {
                endDate = d;
            }

            Db.CalendarEvents.Add(new CalendarEvent
            {
                CalendarEventGuid = eventGuid,
                CalendarGuid = CurrentCalendarGuid,
                UserGuid = userGuid,
                Name = string.Empty,
                StartDateTime = DateTime.Parse(start),
                EndDateTime = endDate
            });
            Db.SaveChanges();
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

    public static class HubExtensions
    {
        public static T OthersInCurrentCalendar<T>(this IHubCallerConnectionContext<T> hub)
        {
            var calendarGuid = HttpContext.Current.Request.QueryString["id"];
            return hub.OthersInGroup(calendarGuid);
        }
    }
}