var core = {
    newGuid: function () {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    },

    wrap: function (first, second) {
        if (typeof first == 'function') {
            return function () {
                first();
                second();
            };
        } else {
            return function () {
                second();
            };
        }
    },

    createCalendarEvent: function (event) {
        var calendarEvent = new core.CalendarEvent();
        calendarEvent.CalendarEventGuid = event.id;
        calendarEvent.UserGuid = event.userGuid;
        calendarEvent.CalendarGuid = event.calendarGuid;
        calendarEvent.Name = event.title;
        calendarEvent.StartDateTime = event.start;
        calendarEvent.EndDateTime = event.end;
        return calendarEvent;
    },

    createEvent: function (calendarEvent) {
        var event = {
            id: calendarEvent.CalendarEventGuid,
            userGuid: calendarEvent.UserGuid,
            calendarGuid: calendarEvent.CalendarGuid,
            title: calendarEvent.Name,
            start: calendarEvent.StartDateTime,
            end: calendarEvent.EndDateTime
        };
        return event;
    },

    User: function (userGuid, name) {
        var self = this;
        self.UserGuid = userGuid;
        self.Name = name;
    },

    CalendarEvent: function () {
        var self = this;
        self.CalendarEventGuid = null;
        self.UserGuid = null;
        self.CalendarGuid = null;
        self.StartDateTime = null;
        self.EndDateTime = null;
        self.Name = '';
    },

    UserManager: function (hub, userList) {
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
            self.renderUserList();
        };

        self.hub.client.addUser = function (user) {
            var user = new core.User(user.UserGuid, user.Name);
            self.addUser(user);
        };

        self.addUsers = function (users) {
            var length = users.length;
            for (var i = 0; i < length; i++) {
                var user = new core.User(users[i].UserGuid, users[i].Name);
                self.addUser(user);
            }
        };

        self.hub.client.addUsers = function (users) {
            self.addUsers(users);
        };

        self.renderUserList = function () {
            self.userList.empty();
            for (var i = 0; i < self.users.length; i++) {
                self.userList.append('<li>' + self.users[i].Name + '</li>');
            }
        };

        self.removeUser = function (userGuid) {
            self.users = self.users.filter(function (user) {
                return user.UserGuid != userGuid;
            });
            self.renderUserList();

            if (self.onUserRemovedCallbacks && $.isArray(self.onUserRemovedCallbacks)) {
                for (var i = 0; i < self.onUserRemovedCallbacks.length; i++) {
                    if (typeof self.onUserRemovedCallbacks[i] == 'function') {
                        self.onUserRemovedCallbacks[i](userGuid);
                    }
                }
            }
        };

        self.onUserRemovedCallbacks = [];

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

        self.hub.client.userDisconnected = function (userGuid) {
            var user = self.getUser(userGuid);
            self.removeUser(user.UserGuid);
        };
    },

    Chat: function (hub, userManager, nameField, messageField, sendButton, discussionList) {
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
    },

    FullCalendar: function (hub, calendarGuid, userManager, element) {
        var self = this;
        self.calendarGuid = calendarGuid;
        self.element = element;
        self.hub = hub;
        self.userManager = userManager;

        self.getEvents = function () {
            return self.element.fullCalendar('clientEvents');
        };

        self.getEvent = function (eventGuid) {
            var events = self.getEvents();
            for (var i = 0; i < events.length; i++) {
                if (events[i].eventGuid === eventGuid) {
                    return events[i];
                }
            }

            return null;
        }

        self.renderEvent = function (event) {
            self.element.fullCalendar('renderEvent', event, true);
        };

        self.removeEvent = function (id) {
            self.element.fullCalendar('removeEvents', id);
        };

        self.removeEvents = function (ids) {
            self.element.fullCalendar('removeEvents', function (event) {
                for (var i = 0; i < ids.length; i++) {
                    if (event.id == ids[i]) {
                        return true;
                    }
                }
                return false;
            });
        };

        userManager.onUserRemovedCallbacks.push(function (removedUserGuid) {
            var events = self.getEvents().filter(function (event) {
                return event.userGuid == removedUserGuid;
            });
            var eventIds = events.map(function (e) {
                return e.id;
            });
            self.removeEvents(eventIds);
        });

        self.rerenderEvents = function () {
            self.element.fullCalendar('rerenderEvents');
        };

        self.hub.client.addEvent = function (calendarEvent) {
            var event = core.createEvent(calendarEvent);
            event.editable = false;
            self.renderEvent(event);
        };

        self.hub.client.addExistingEvents = function (calendarEvents) {
            for (var i = 0; i < calendarEvents.length; i++) {
                var event = core.createEvent(calendarEvents[i]);
                event.editable = false;
                self.renderEvent(event);
            }
        };

        self.hub.client.updateEvent = function (updatedCalendarEvent) {
            var event = self.getEvent(updatedCalendarEvent.eventGuid);
            if (event) {
                event.title = updatedCalendarEvent.Name;
                event.start = updatedCalendarEvent.StartDateTime;
                event.end = updatedCalendarEvent.EndDateTime;
            }

            self.updateEvent(event);
        };

        self.updateEvent = function (event) {
            self.element.fullCalendar('updateEvent', event);
        }

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
            editable: true,
            eventLimit: true,
            selectable: true,
            select: function (start, end, jsEvent) {
                if (jsEvent) {
                    var event = {
                        id: core.newGuid(),
                        userGuid: userManager.currentUser.UserGuid,
                        calendarGuid: self.calendarGuid,
                        title: '',
                        start: start,
                        end: end
                    };
                    var calendarEvent = core.createCalendarEvent(event);

                    self.hub.server.addEvent(calendarEvent);
                    self.renderEvent(event);
                }
            },
            selectHelper: true,
            eventClick: function (event, jsEvent, view) {
                if (event.userGuid == userManager.currentUser.UserGuid) {
                    self.hub.server.removeEvent(event.id);
                    self.removeEvent(event.id);
                }
            },
            eventRender: function (event, element, view) {
                if (!element.hasClass('fc-helper')
                    && event.userGuid != userManager.currentUser.UserGuid) {
                    element.css('background-color', 'red');
                }
            },
            eventDrop: function (event, delta, revertFunc, jsEvent, ui, view) {
                var calendarEvent = core.createCalendarEvent(event);
                self.hub.server.updateEvent(calendarEvent);
            },
            eventResize: function (event, delta, revertFunc, jsEvent, ui, view) {
                var calendarEvent = core.createCalendarEvent(event);
                self.hub.server.updateEvent(calendarEvent);
            }
        });
    }
};