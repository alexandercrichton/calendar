﻿namespace SignalRChat.Models.User
{
    public class UserModel
    {
        public int? UserId { get; set; }
        public string Name { get; set; }
        public bool IsActive { get; set; }
        public string Email { get; set; }
    }
}