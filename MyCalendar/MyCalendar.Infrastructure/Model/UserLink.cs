using System.ComponentModel.DataAnnotations;

namespace MyCalendar.Infrastructure.Model
{
    public class UserLink
    {
        public UserLink() { }

        public UserLink(int? fromUserId, int? toUserId)
        {
            FromUserId = fromUserId;
            ToUserId = toUserId;
        }

        [Key]
        public int? UserLinkId { get; set; }
        public int? FromUserId { get; set; }
        public int? ToUserId { get; set; }
    }
}
