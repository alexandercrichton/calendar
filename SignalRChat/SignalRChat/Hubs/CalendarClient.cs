using Calendar.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SignalRChat.Hubs
{
    public interface ICalendarClient
    {
        void SetCurrentUser(User user);
        void AddUser(User user);
        void AddUsers(IEnumerable<User> users);

        void AddMessage(string userGuid, string message);

        void NewSelection(string start, string end);

        void DayClicked(string date);

        void AddEvent(string id, string start, string end);
        void RemoveEvent(string id);
    }
}