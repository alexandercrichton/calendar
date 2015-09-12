using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SignalRChat.Hubs
{
    public interface ICalendarClient
    {
        void NewMessage(string message);
        void NewMessage(string name, string message);

        void NewSelection(string start, string end);

        void DayClicked(string date);

        void AddEvent(string start, string end);
    }
}