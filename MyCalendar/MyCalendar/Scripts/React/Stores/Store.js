define([
    'reflux',
    'Actions'
],
    function (
        Reflux,
        Actions
    ) {
        var Store = Reflux.createStore({
            listenables: [Actions],

            init: function () {
                this.state = {
                    ui: {
                        menuPanel: 1,
                        mainPanel: 0
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

            onSetMenuSection: function (panel) {
                this.state.ui.menuPanel = panel;
                this.triggerStore();
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
                this.state.currentUser = this.getUserById(userId);
                this.triggerStore();
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
                this.state.currentUser = null;
                this.triggerStore();
            },

            onEditUser: function () {
            },

            triggerStore: function () {
                this.trigger(this.state);
            }
        });

        return Store;
    });