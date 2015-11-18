using System;

namespace MyCalendar.Common.Extensions
{
    public static class PrimitiveExtensions
    {
        public static Guid? ToGuid(this string s)
        {
            Guid guid;
            if (Guid.TryParse(s, out guid))
            {
                return guid;
            }

            return null;
        }

        public static int? ToInt(this string s)
        {
            int i;
            if (int.TryParse(s, out i))
            {
                return i;
            }

            return null;
        }
    }
}