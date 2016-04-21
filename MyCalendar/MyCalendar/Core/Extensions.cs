using System;

namespace MyCalendar.Core
{
    public static class Extensions
    {
        public static DateTime? ToDateTime(this string s)
        {
            DateTime d;
            if (DateTime.TryParse(s, out d))
            {
                return d;
            }

            return null;
        }
    }
}