﻿var core = {
    newGuid: function () {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    }
};

function User(userGuid, name) {
    var self = this;
    self.UserGuid = userGuid;
    self.Name = name;
};

function UserManager(hub, userList) {
    var self = this;
    self.hub = hub;
    self.userList = userList;

    self.users = [];
    self.currentUser = {};

    self.setCurrentUser = function (user) {
        self.currentUser = user;
        self.addUser(user);
    };

    self.hub.client.setCurrentUser = function (user) {
        self.setCurrentUser(user);
    };

    self.addUser = function (user) {
        self.users.push(user);
        self.userList.empty();
        for (var i = 0; i < self.users.length; i++) {
            self.userList.append('<li>' + self.users[i].Name + '</li>');
        }
    };

    self.hub.client.addUser = function (user) {
        var user = new User(user.UserGuid, user.Name);
        self.addUser(user);
    };

    self.addUsers = function (users) {
        var length = users.length;
        for (var i = 0; i < length; i++) {
            var user = new User(users[i].UserGuid, users[i].Name);
            self.addUser(user);
        }
    };

    self.hub.client.addUsers = function (users) {
        self.addUsers(users);
    };

    self.removeUser = function (userGuid) {

    };

    self.getUser = function (userGuid) {
        for (var i = 0; i < self.users.length; i++) {
            if (self.users[i].UserGuid == userGuid) {
                return self.users[i];
            }
        }

        return null;
    };

    self.updateUser = function (userGuid, name) {
        for (var i = 0; i < self.users.length; i++) {
            if (self.users[i].UserGuid == userGuid) {
                self.users[i].Name = name;
            }
        }
    };
};

function Chat(hub, userManager, nameField, messageField, sendButton, discussionList) {
    var self = this;
    self.hub = hub;
    self.userManager = userManager;
    self.nameField = nameField;
    self.messageField = messageField;
    self.sendButton = sendButton;
    self.discussionList = discussionList;

    self.sendButton.on('click', function () {
        var currentUser = userManager.currentUser;
        var message = messageField.val();
        self.hub.server.sendMessage(currentUser.UserGuid, message);
        self.addMessage(currentUser.UserGuid, message)
    });

    self.addMessage = function (userGuid, message) {
        var user = userManager.getUser(userGuid);
        discussionList.append('<li><strong>' + user.Name + '</strong>' + message + '</li>');
    };

    self.hub.client.addMessage = function (userGuid, message) {
        var user = userManager.getUser(userGuid);
        chat.addMessage(user.UserGuid, message);
    };
};

function FullCalendar(hub, userManager, element) {
    var self = this;
    self.element = element;
    self.hub = hub;
    self.userManager = userManager;

    self.getEvents = function () {
        return self.element.fullCalendar('clientEvents');
    };

    self.renderEvent = function (event) {
        self.element.fullCalendar('renderEvent', event);
    };

    self.removeEvent = function (id) {
        var el = $('.fc-event').filter(function () {
            return $(this).attr('fc-id') == id
        });
        el.css('color', 'red');
        el.parent().remove()
        self.element.fullCalendar('removeEvents', id);
    };

    self.rerenderEvents = function () {
        self.element.fullCalendar('rerenderEvents');
    };

    self.hub.client.addEvent = function (id, userGuid, start, end) {
        var event = {
            id: id,
            userGuid: userGuid,
            title: '',
            start: start,
            end: end
        };
        self.renderEvent(event);
    };

    self.hub.client.removeEvent = function (id) {
        calendar.removeEvent(id);
        calendar.rerenderEvents();
    };

    self.element.fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek'
        },
        defaultDate: '2015-02-12',
        editable: true,
        eventLimit: true,
        selectable: true,
        selectHelper: true,
        eventClick: function (event, jsEvent, view) {
            self.hub.server.removeEvent(event.id);
            self.removeEvent(event.id);
        },
        eventRender: function (event, element, view) {
            element.attr('fc-id', event.id);
            if (event.userGuid != userManager.currentUser.UserGuid) {
                element.css('background-color', 'red');
            }
        },
        select: function (start, end, jsEvent) {
            if (jsEvent) {
                var event = {
                    id: core.newGuid(),
                    userGuid: userManager.currentUser.UserGuid,
                    title: '',
                    start: start,
                    end: end
                };
                self.hub.server.addEvent(event.id, event.userGuid, event.start, event.end);
                self.renderEvent(event);
            }
        }
    });
}