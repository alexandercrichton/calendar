using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SignalRChat.Hubs
{
    public interface ICalendarClient
    {
        void AddMessage(string name, string message);

        void NewSelection(string start, string end);

        void DayClicked(string date);

        void AddEvent(string id, string start, string end);
        void RemoveEvent(string id);
    }
}