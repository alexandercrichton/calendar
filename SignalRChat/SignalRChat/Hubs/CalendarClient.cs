using MyCalendar.Data.Models;
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

        void AddMessage(Guid userGuid, string message);

        void NewSelection(string start, string end);

        void DayClicked(string date);

        void AddEvent(CalendarEvent calendarEvent);
        void AddExistingEvents(IEnumerable<CalendarEvent> events);
        void UpdateEvent(CalendarEvent calendarEvent);
        void RemoveEvent(Guid eventId);

        void UserDisconnected(Guid userGuid);
    }
}