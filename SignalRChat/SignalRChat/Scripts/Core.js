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

    before: function (before, fn) {
        return function () {
            before.apply(this, arguments);
            return fn.apply(this, arguments);
        };
    },

    http: {
        getBaseUri: function () {
            return location.protocol + '//' + location.host;
        },

        get: function (methodUri, onDone, onFail) {
            $.ajax({
                url: methodUri,
                type: 'GET',
                contentType: 'application/json'
            })
                .done(function (data) {
                    if (onDone) {
                        onDone(data);
                    }
                })
                .fail(function (jqXHR, textStatus, errorThrown) {
                    console.log(textStatus);
                    console.log(errorThrown);
                    if (onFail) {
                        onFail(jqXHR, textStatus, errorThrown);
                    }
                });
        },

        post: function (methodUri, postData, onDone, onFail) {
            $.ajax({
                url: methodUri,
                type: 'POST',
                dataType: 'json',
                data: postData
            })
                .done(function (data) {
                    if (onDone) {
                        onDone(data);
                    }
                })
                .fail(function (jqXHR, textStatus, errorThrown) {
                    console.log(textStatus);
                    console.log(errorThrown);
                    if (onFail) {
                        onFail(jqXHR, textStatus, errorThrown);
                    }
                });
        }
    },

    event: {
        create: function (event) {
            core.http.post(event, 'Calendar/Create')
                .done(function (data) {
                    event = data;
                });
            return event;
        }
    },

    convert: {
        toEvent: function (fcEvent) {
            var event = new core.model.Event();
            event.EventId = fcEvent.id;
            event.UserId = fcEvent.userId;
            event.Name = fcEvent.title;
            event.StartDateTime = fcEvent.start.toISOString();
            event.EndDateTime = fcEvent.end.toISOString();
            return event;
        },

        toFcEvent: function (event) {
            var fcEvent = {
                id: event.EventId,
                userId: event.UserId,
                title: event.Name,
                start: moment(event.StartDateTime),
                end: moment(event.EndDateTime)
            };
            return fcEvent;
        }
    },

    model: {
        User: function () {
            var self = this;
            self.UserId = null;
            self.Name = '';
        },

        Event: function () {
            var self = this;
            self.UserId = null;
            self.StartDateTime = null;
            self.EndDateTime = null;
            self.Name = '';
        }
    },

    UserManager: function (userList) {
        var self = this;
        //self.hub = hub;
        self.userList = userList;

        self.users = [];
        self.currentUser = {};

        self.setCurrentUser = function (user) {
            self.currentUser = user;
            self.addUser(user);
        };

        //self.hub.client.setCurrentUser = function (user) {
        //    self.setCurrentUser(user);
        //};

        self.registerUser = function (userId, name, email, password) {
            var registerModel = {
                UserId: userId,
                Name: name,
                Email: email,
                Password: password
            };

            core.http.post(registerModel, 'User/Register')
                .done(function (data) {
                    if (data) {
                        alert(data);
                        return true;
                    }
                })
                .error(function (xhr, ajaxOptions, thrownError) {
                    alert(thrownError);
                    return false;
                });
        };

        self.addUser = function (user) {
            self.users.push(user);
            self.renderUserList();
        };

        //self.hub.client.addUser = function (user) {
        //    var user = new core.model.User(user.UserId, user.Name);
        //    self.addUser(user);
        //};

        self.addUsers = function (users) {
            var length = users.length;
            for (var i = 0; i < length; i++) {
                var user = new core.model.User(users[i].UserId, users[i].Name);
                user.UserId = users[i].UserId;
                user.Name = users[i].Name;
                self.addUser(user);
            }
        };

        //self.hub.client.addUsers = function (users) {
        //    self.addUsers(users);
        //};

        self.renderUserList = function () {
            self.userList.empty();
            for (var i = 0; i < self.users.length; i++) {
                self.userList.append('<li>' + self.users[i].Name + '</li>');
            }
        };

        self.removeUser = function (userId) {
            self.users = self.users.filter(function (user) {
                return user.UserId != userId;
            });
            self.renderUserList();

            if (self.onUserRemovedCallbacks && $.isArray(self.onUserRemovedCallbacks)) {
                for (var i = 0; i < self.onUserRemovedCallbacks.length; i++) {
                    if (typeof self.onUserRemovedCallbacks[i] == 'function') {
                        self.onUserRemovedCallbacks[i](userId);
                    }
                }
            }
        };

        self.onUserRemovedCallbacks = [];

        self.getUser = function (userId) {
            for (var i = 0; i < self.users.length; i++) {
                if (self.users[i].UserId == userId) {
                    return self.users[i];
                }
            }

            return null;
        };

        self.updateUser = function (userId, name) {
            for (var i = 0; i < self.users.length; i++) {
                if (self.users[i].UserId == userId) {
                    self.users[i].Name = name;
                }
            }
        };

        //self.hub.client.userDisconnected = function (userId) {
        //    var user = self.getUser(userId);
        //    self.removeUser(user.UserId);
        //};
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
            self.hub.server.sendMessage(currentUser.UserId, message);
            self.addMessage(currentUser.UserId, message)
        });

        self.addMessage = function (userId, message) {
            var user = userManager.getUser(userId);
            discussionList.append('<li><strong>' + user.Name + '</strong>' + message + '</li>');
        };

        self.hub.client.addMessage = function (userId, message) {
            var user = userManager.getUser(userId);
            chat.addMessage(user.UserId, message);
        };
    },

    FullCalendar: function (userManager, element) {
        var self = this;
        self.element = element;
        //self.hub = hub;
        self.userManager = userManager;

        self.getEvents = function () {
            return self.element.fullCalendar('clientEvents');
        };

        self.getEvent = function (eventId) {
            var events = self.getEvents();
            for (var i = 0; i < events.length; i++) {
                if (events[i].eventId === eventId) {
                    return events[i];
                }
            }

            return null;
        }

        self.renderEvent = function (fcEvent) {
            self.element.fullCalendar('renderEvent', fcEvent, true);
        };

        self.removeEvent = function (id) {
            self.element.fullCalendar('removeEvents', id);
        };

        self.removeEvents = function (ids) {
            self.element.fullCalendar('removeEvents', function (fcEvent) {
                for (var i = 0; i < ids.length; i++) {
                    if (fcEvent.id == ids[i]) {
                        return true;
                    }
                }
                return false;
            });
        };

        userManager.onUserRemovedCallbacks.push(function (removedUserId) {
            var events = self.getEvents().filter(function (fcEvent) {
                return fcEvent.userId == removedUserId;
            });
            var eventIds = events.map(function (e) {
                return e.id;
            });
            self.removeEvents(eventIds);
        });

        self.rerenderEvents = function () {
            self.element.fullCalendar('rerenderEvents');
        };

        //self.hub.client.addEvent = function (event) {
        //    var fcEvent = core.createEvent(event);
        //    fcEvent.editable = false;
        //    self.renderEvent(fcEvent);
        //};

        //self.hub.client.addEvents = function (calendarEvents) {
        //    for (var i = 0; i < calendarEvents.length; i++) {
        //        var fcEvent = core.createEvent(calendarEvents[i]);
        //        fcEvent.editable = false;
        //        self.renderEvent(fcEvent);
        //    }
        //};

        //self.hub.client.updateEvent = function (updatedCalendarEvent) {
        //    var fcEvent = self.getEvent(updatedCalendarEvent.eventGuid);
        //    if (fcEvent) {
        //        fcEvent.title = updatedCalendarEvent.Name;
        //        fcEvent.start = updatedCalendarEvent.StartDateTime;
        //        fcEvent.end = updatedCalendarEvent.EndDateTime;
        //    }

        //    self.updateEvent(fcEvent);
        //};

        self.updateEvent = function (fcEvent) {
            self.element.fullCalendar('updateEvent', fcEvent);
        }

        //self.hub.client.removeEvent = function (id) {
        //    calendar.removeEvent(id);
        //    calendar.rerenderEvents();
        //};

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
                    var fcEvent = {
                        userId: userManager.currentUser.UserId,
                        title: '',
                        start: start,
                        end: end
                    };
                    var event = core.convert.toEvent(fcEvent);
                    event = core.event.create(event);
                    //self.hub.server.addEvent(event);
                    self.renderEvent(fcEvent);
                }
            },
            selectHelper: true,
            eventClick: function (fcEvent, jsEvent, view) {
                if (fcEvent.userId == userManager.currentUser.UserId) {
                    //self.hub.server.removeEvent(fcEvent.id);
                    self.removeEvent(fcEvent.id);
                }
            },
            eventRender: function (fcEvent, element, view) {
                if (!element.hasClass('fc-helper')
                    && fcEvent.userId != userManager.currentUser.UserId) {
                    element.css('background-color', 'red');
                }
            },
            eventDrop: function (fcEvent, delta, revertFunc, jsEvent, ui, view) {
                var event = core.createCalendarEvent(fcEvent);
                //self.hub.server.updateEvent(event);
            },
            eventResize: function (fcEvent, delta, revertFunc, jsEvent, ui, view) {
                var event = core.createCalendarEvent(fcEvent);
                //self.hub.server.updateEvent(event);
            }
        });
    }
};