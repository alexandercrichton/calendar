using MyCalendar.Common.Models;
using System;
using System.Collections.Generic;

namespace MyCalendar.Hubs
{
    public interface ICalendarClient
    {
        void SetCurrentUser(User user);

        void AddUser(User user);

        void AddUsers(IEnumerable<User> users);

        void AddMessage(Guid userGuid, string message);

        void AddEvent(Event calendarEvent);

        void AddEvents(IEnumerable<Event> events);

        void UpdateEvent(Event calendarEvent);

        void RemoveEvent(Guid eventId);

        void UserDisconnected(Guid userGuid);
    }
}