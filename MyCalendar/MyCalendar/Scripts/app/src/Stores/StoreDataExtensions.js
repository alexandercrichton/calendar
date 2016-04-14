import $ from "jquery";

export default {
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
        $.post(
            "User/Login",
            loginFields,
            function (data) {
                console.log(data);
            }
        );

        //var user = this.getUserByEmailPassword(loginFields.email, loginFields.password);
        //if (user) {
        //    this.setCurrentUser(user.userId);
        //}
    },

    onLogout: function () {
        this.state.currentUserId = 0;
        this.onSetMainPanel(MAIN_PANEL.NONE);
        this.triggerStore();
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
    }
};