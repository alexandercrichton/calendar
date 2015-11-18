using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyCalendar.Common.Models
{
    public class ViewLink
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int? ViewLinkId { get; set; }

        public int? ViewId { get; set; }

        public int? UserId { get; set; }

        public virtual View View { get; set; }

        public virtual User User { get; set; }
    }
}