using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Calendar.Data.Models
{
    public class UserConnection
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid UserConnectionGuid { get; set; }

        public Guid UserGuid { get; set; }

        public Guid ConnectionId { get; set; }
    }
}
