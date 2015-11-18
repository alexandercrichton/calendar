using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyCalendar.Common.Models
{
    public class View
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int? ViewId { get; set; }

        public int? UserId { get; set; }

        public string Name { get; set; }

        //[JsonIgnore]
        //public virtual ICollection<UserConnection> UserConnections { get; set; }

        [JsonIgnore]
        public virtual User User { get; set; }
    }
}