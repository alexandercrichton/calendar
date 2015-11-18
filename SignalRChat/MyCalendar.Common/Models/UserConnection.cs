using Newtonsoft.Json;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyCalendar.Common.Models
{
    public class UserConnection
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid UserConnectionGuid { get; set; }

        public Guid UserGuid { get; set; }

        public Guid CalendarGuid { get; set; }

        public Guid ConnectionId { get; set; }

        public DateTime? DisconnectedDateTime { get; set; }

        [JsonIgnore]
        public virtual User User { get; set; }

        [JsonIgnore]
        public virtual View Calendar { get; set; }
    }
}