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

        var Store = Reflux.createStore({
            listenables: [Actions],

            init: function () {
                this.state = {
                    ui: {
                        menuPanel: MENU_PANEL.ACCOUNT,
                        mainPanel: MAIN_PANEL.USER_DETAILS
                    },
                    users: [
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
                        }
                    ],
                    currentUserId: 0,
                    getCurrentUser: function () {
                        return this.getUserById(this.state.currentUserId);
                    }.bind(this),
                    groups: [
                        {
                            groupId: 1,
                            name: 'group 1',
                            userIds: [1, 2]
                        }
                    ]
                };
            },

            getInitialState: function () {
                return this.state;
            },

            onRegister: function (registerFields) {
                if (!this.getUserByEmailPassword(registerFields.email, registerFields.password)) {
                    var user = {
                        userId: this.state.users.length,
                        name: registerFields.name,
                        email: registerFields.email,
                        password: registerFields.password
                    };

                    this.state.users.push(user);

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
                this.state.currentUserId = userId;
                this.onSetMenuPanel(MENU_PANEL.ACCOUNT);
                this.onSetMainPanel(MAIN_PANEL.USER_DETAILS);
            },

            getUserById: function (userId) {
                for (var i = 0; i < this.state.users.length; i++) {
                    var user = this.state.users[i];
                    if (user.userId === userId) {
                        return user;
                    }
                }

                return null;
            },

            getUserByEmailPassword: function (email, password) {
                for (var i = 0; i < this.state.users.length; i++) {
                    var user = this.state.users[i];
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
                this.state.ui.menuPanel = panel;
                this.triggerStore();
            },

            onShowMenuAccountPanel: function () {
                this.onSetMenuPanel(MENU_PANEL.ACCOUNT);
            },

            onShowMenuPeoplePanel: function () {
                this.onSetMenuPanel(MENU_PANEL.PEOPLE);
            },

            onShowMenuGroupsPanel: function () {
                this.onSetMenuPanel(MENU_PANEL.GROUPS);
            },

            onSetMainPanel: function (panel) {
                this.state.ui.mainPanel = panel;
                this.triggerStore();
            },

            onSaveUserDetails: function (userDetails) {
                var currentUser = this.state.getCurrentUser();
                Object.assign(currentUser, userDetails);
                this.triggerStore();
            },

            triggerStore: function () {
                this.trigger(this.state);
            }
        });

        return Store;
    });