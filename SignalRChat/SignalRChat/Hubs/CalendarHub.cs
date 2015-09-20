using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using System.Threading.Tasks;
using Microsoft.AspNet.SignalR.Hubs;
using System.Web.SessionState;
using Calendar.Data;
using Calendar.Data.Models;

namespace SignalRChat.Hubs
{
    public class CalendarHub : Hub<ICalendarClient>
    {
        protected CalendarContext Db { get; set; }

        public CalendarHub()
        {
            Db = new CalendarContext();
        }

        public void JoinGroup(string userName, string groupGuid)
        {
            Groups.Add(Context.ConnectionId, groupGuid);

            var user = new User
            {
                Name = userName
            };
            Db.Users.Add(user);
            Db.SaveChanges();

            var userGroup = new UserGroup
            {
                GroupGuid = Guid.Parse(groupGuid),
                UserGuid = user.UserGuid
            };
            Db.UserGroups.Add(userGroup);

            Db.SaveChanges();

            Clients.OthersInCurrentGroup().AddUser(user);

            var usersInGroup = Db.Users
                 .Join(Db.UserGroups,
                     u => u.UserGuid,
                     ug => ug.UserGuid,
                     (u, ug) => new { u, ug })
                 .ToList()
                 .Where(a => a.ug.GroupGuid == userGroup.GroupGuid
                     && a.u.UserGuid != user.UserGuid)
                 .Select(a => a.u)
                 .ToList();

            Clients.Caller.SetCurrentUser(user);
            Clients.Caller.AddUsers(usersInGroup);
        }

        public async Task RegisterAsUser(string id, string name)
        {
            var user = new User
            {
                UserGuid = Guid.Parse(id),
                Name = name
            };
            Clients.OthersInCurrentGroup().AddUser(user);
        }

        public async Task SendMessage(string userGuid, string message)
        {
            Clients.OthersInCurrentGroup().AddMessage(userGuid, message);
        }

        public async Task DayClicked(string start)
        {
            Clients.Others.NewSelection(start, null);
        }

        public async Task AddEvent(string id, string start, string end)
        {
            Clients.OthersInCurrentGroup().AddEvent(id, start, end);
            //Clients.OthersInCurrentGroup().AddEvent(start, end);
            //Clients.Others.AddEvent(start, end);
        }
        public async Task RemoveEvent(string id)
        {
            Clients.OthersInCurrentGroup().RemoveEvent(id);
            //Clients.OthersInCurrentGroup().AddEvent(start, end);
            //Clients.Others.AddEvent(start, end);
        }

        protected string GetGroupFromCurrentRequest()
        {
            return HttpContext.Current.Request.QueryString["id"];
        }
    }

    public static class HubExtensions
    {
        public static T OthersInCurrentGroup<T>(this IHubCallerConnectionContext<T> hub)
        {
            var group = HttpContext.Current.Request.QueryString["id"];
            return hub.OthersInGroup(group);
        }
    }
}