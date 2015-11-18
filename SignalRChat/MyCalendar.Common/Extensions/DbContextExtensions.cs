using System;
using System.Data.Entity;
using System.Linq.Expressions;

namespace MyCalendar.Common.Extensions
{
    public static class DbContextExtensions
    {
        public static void InsertOrUpdate<T>(this DbContext context, T t, Func<T, Guid?> getGuid)
            where T : class
        {
            context.Entry(t).State = getGuid(t).HasValue
                ? EntityState.Modified
                : EntityState.Added;
        }

        public static void Update<T>(this DbContext context, T obj,
            params Expression<Func<T, object>>[] propertiesToUpdate)
            where T : class
        {
            context.Set<T>().Attach(obj);

            foreach (var property in propertiesToUpdate)
            {
                context.Entry(obj).Property(property).IsModified = true;
            }
        }
    }
}