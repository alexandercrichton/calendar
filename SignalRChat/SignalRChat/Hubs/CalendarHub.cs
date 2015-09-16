using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using System.Threading.Tasks;
using Microsoft.AspNet.SignalR.Hubs;

namespace SignalRChat.Hubs
{
    public class CalendarHub : Hub<ICalendarClient>
    {
        public void JoinGroup(string groupName)
        {
            Groups.Add(Context.ConnectionId, groupName);
        }

        public async Task Send(string name, string message)
        {
            Clients.All.NewMessage(name, message);
        }

        public async Task SendSelection(string start, string end)
        {
            Clients.Others.NewSelection(start, end);
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