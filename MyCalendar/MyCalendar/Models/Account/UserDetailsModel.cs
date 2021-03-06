﻿using MyCalendar.Infrastructure.Model;

namespace MyCalendar.Models.Account
{
    public class UserDetailsModel
    {
        public UserDetailsModel() { }

        public UserDetailsModel(User user)
        {
            UserId = user.UserId;
            Name = user.Name;
            Email = user.Email;
        }

        public int? UserId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }

        public void WriteTo(User user)
        {
            user.UserId = UserId;
            user.Name = Name;
            user.Email = Email;
        }
    }
}