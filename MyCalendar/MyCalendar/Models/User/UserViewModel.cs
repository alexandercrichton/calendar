namespace MyCalendar.Models.User
{
    public class UserViewModel
    {
        public UserViewModel(Infrastructure.Model.User user)
        {
            UserId = user.UserId;
            Name = user.Name;
            Email = user.Email;
        }

        public int? UserId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
    }
}