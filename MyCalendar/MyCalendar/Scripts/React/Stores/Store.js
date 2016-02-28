define([
    'reflux',
    'Actions'
],
    function (
        Reflux,
        Actions
    ) {
        const MAIN_PANEL = {
            NONE: 0,
            USER_DETAILS: 1,
            PERSON: 2,
            GROUP: 3
        };

        const MENU_PANEL = {
            NONE: 0,
            ACCOUNT: 1,
            PEOPLE: 2,
            GROUPS: 3
        };

        var allUsers = [
            {
                userId: 1,
                name: '1',
                email: '1',
                password: '1'
            },
            {
                userId: 2,
                name: '2',
                email: '2',
                password: '2'
            },
            {
                userId: 3,
                name: '3',
                email: '3',
                password: '3'
            }
        ];

        var userLinks = {};

        var person1Links = [
            allUsers[1].userId
        ];
        userLinks[allUsers[0].userId] = person1Links;

        var highestEventId = 1;

        var Store = Reflux.createStore({
            listenables: [Actions],

            init: function () {
                this.state = {
                    ui: {
                        menuPanel: MENU_PANEL.ACCOUNT,
                        mainPanel: MAIN_PANEL.USER_DETAILS
                    },

                    users: [

                    ],

                    currentUserId: 0,

                    getCurrentUser: function () {
                        return this.getUserById(this.state.currentUserId);
                    }.bind(this),

                    currentSelectedUserId: 0,

                    getCurrentSelectedUser: function () {
                        return this.getUserById(this.state.currentSelectedUserId);
                    }.bind(this),

                    groups: [
                        {
                            groupId: 1,
                            name: 'group 1',
                            userIds: [1, 2]
                        }
                    ],

                    events: [
                        {
                            id: this.getNextEventId(),
                            userId: allUsers[0].userId,
                            title: "1",
                            start: "2016-02-01"
                        },
                        {
                            id: this.getNextEventId(),
                            userId: allUsers[0].userId,
                            title: "2",
                            start: "2016-02-02"
                        },
                        {
                            id: this.getNextEventId(),
                            userId: allUsers[1].userId,
                            title: "3",
                            start: "2016-02-03"
                        }
                    ],

                    getEventsForCurrentUser: function () {
                        return this.state.events.filter(function (event) {
                            return (event.userId === this.state.currentUserId);
                        }.bind(this));
                    }.bind(this),

                    getCombinedEventsWithSelectedUser: function () {
                        return this.state.events.filter(function (event) {
                            return (event.userId === this.state.currentUserId
                                || event.userId === this.state.currentSelectedUserId);
                        }.bind(this));
                    }.bind(this)
                };
            },

            getInitialState: function () {
                return this.state;
            },

            isUserLoggedIn: function () {
                return this.state.currentUserId > 0;
            },

            onRegister: function (registerFields) {
                if (!this.getUserByEmailPassword(registerFields.email, registerFields.password)) {
                    var user = {
                        userId: allUsers.length + 1,
                        name: registerFields.name,
                        email: registerFields.email,
                        password: registerFields.password
                    };

                    allUsers.push(user);

                    this.setCurrentUser(user.userId);
                }
            },

            onLogin: function (loginFields) {
                var user = this.getUserByEmailPassword(loginFields.email, loginFields.password);
                if (user) {
                    this.setCurrentUser(user.userId);
                }
            },

            setCurrentUser: function (userId) {
                if (userId > 0) {
                    this.state.currentUserId = userId;
                    this.updateUsersForCurrentUser();
                    this.onSetMenuPanel(MENU_PANEL.ACCOUNT);
                    this.onSetMainPanel(MAIN_PANEL.USER_DETAILS);
                }
            },

            updateUsersForCurrentUser: function () {
                this.state.users = [];
                var links = userLinks[this.state.currentUserId];
                if (links) {
                    for (var i = 0; i < links.length; i++) {
                        this.state.users.push(this.getUserById(links[i]));
                    }
                }
            },

            getUserById: function (userId) {
                for (var i = 0; i < allUsers.length; i++) {
                    var user = allUsers[i];
                    if (user.userId === userId) {
                        return user;
                    }
                }

                return null;
            },

            getUserByEmail: function (email) {
                for (var i = 0; i < allUsers.length; i++) {
                    var user = allUsers[i];
                    if (user.email === email) {
                        return user;
                    }
                }

                return null;
            },

            getUserByEmailPassword: function (email, password) {
                for (var i = 0; i < allUsers.length; i++) {
                    var user = allUsers[i];
                    if (user.email === email && user.password === password) {
                        return user;
                    }
                }

                return null;
            },

            onLogout: function () {
                this.state.currentUserId = 0;
                this.onSetMainPanel(MAIN_PANEL.NONE);
                this.triggerStore();
            },

            onSetMenuPanel: function (panel) {
                if (this.isUserLoggedIn()) {
                    if (this.isUserLoggedIn()) {
                        this.state.ui.menuPanel = panel;
                        this.triggerStore();
                    }
                }
            },

            onShowMenuAccountPanel: function () {
                if (this.isUserLoggedIn()) {
                    this.onSetMenuPanel(MENU_PANEL.ACCOUNT);
                }
            },

            onShowMenuPeoplePanel: function () {
                if (this.isUserLoggedIn()) {
                    this.onSetMenuPanel(MENU_PANEL.PEOPLE);
                }
            },

            onShowMenuGroupsPanel: function () {
                if (this.isUserLoggedIn()) {
                    this.onSetMenuPanel(MENU_PANEL.GROUPS);
                }
            },

            onSetMainPanel: function (panel) {
                if (this.isUserLoggedIn()) {
                    this.state.ui.mainPanel = panel;
                    this.triggerStore();
                }
            },

            onShowMainPersonPanel: function () {
                this.onSetMainPanel(MAIN_PANEL.PERSON);
            },

            onViewPerson: function (userId) {
                if (this.isUserLoggedIn()) {
                    var user = this.getUserById(userId);
                    if (user) {
                        this.state.currentSelectedUserId = user.userId;
                        this.onShowMainPersonPanel();
                        this.triggerStore();
                    }
                }
            },

            onSaveUserDetails: function (userDetails) {
                if (this.isUserLoggedIn()) {
                    var currentUser = this.state.getCurrentUser();
                    Object.assign(currentUser, userDetails);
                    this.triggerStore();
                }
            },

            onAddLinkToSelectedEmail: function (email) {
                var user = this.getUserByEmail(email);
                if (user) {
                    if (userLinks[this.state.currentUserId] === undefined) {
                        userLinks[this.state.currentUserId] = [];
                    }

                    userLinks[this.state.currentUserId].push(user.userId)
                    this.updateUsersForCurrentUser();
                    this.triggerStore();
                }
            },

            onRemoveLinkForPerson: function (userId) {
                var links = userLinks[this.state.currentUserId];
                userLinks[this.state.currentUserId] = links.filter(function (link) {
                    return (link !== userId);
                });
                this.updateUsersForCurrentUser();
                this.triggerStore();
            },

            onAddEventForCurrentUser: function (event) {
                event.id = this.getNextEventId();
                event.userId = this.state.currentUserId;
                this.state.events.push(event);
                this.triggerStore();
            },

            onRemoveEventForCurrentUser: function (eventId) {
                this.state.events = this.state.events.filter(function (event) {
                    return event.id !== eventId;
                });
                this.triggerStore();
            },

            getNextEventId: function () {
                return highestEventId++;
            },

            triggerStore: function () {
                this.trigger(this.state);
            }
        });

        return Store;
    });