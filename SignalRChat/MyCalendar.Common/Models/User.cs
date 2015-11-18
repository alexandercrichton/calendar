using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Web.Script.Serialization;

namespace MyCalendar.Common.Models
{
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int? UserId { get; set; }

        public string Name { get; set; }

        public bool IsActive { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        //[JsonIgnore]
        //public virtual ICollection<UserConnection> UserConnections { get; set; }

        [ScriptIgnore]
        public virtual ICollection<Event> Events { get; set; }
    }
}