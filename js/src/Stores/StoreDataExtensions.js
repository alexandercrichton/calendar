import $ from "jquery";

import * as Constants from "../Constants";

export default {
    onRegister: function (registerFields) {
        var user = {
            Name: registerFields.name,
            Email: registerFields.email,
            Password: registerFields.password
        };

        $.post("Account/Register", user)
            .done(function (data) {
                console.log(data);
                this.getViewData(data);
            }.bind(this))
    },

    onLogin: function (loginFields) {
        $.post("Account/Login", loginFields)
            .done(function (data) {
                this.getViewData(data);
            }.bind(this));
    },

    onLogout: function () {
        this.state.currentUserId = 0;
        this.onSetMainPanel(Constants.Panel.Main.NONE);
        this.triggerStore();
    },

    onSaveUserDetails: function (userDetails) {
        if (this.isUserLoggedIn()) {
            var currentUser = this.state.getCurrentUser();
            currentUser.Name = userDetails.name;
            currentUser.Email = userDetails.email;
            this.triggerStore();
            this.postUserDetails(currentUser);
        }
    },

    postUserDetails: function (userDetails) {
        $.post("Account/UpdateUser", userDetails)
            .done((data) => {
                console.log(data);
            });
    },

    onAddLinkToSelectedEmail: function (email) {
        var user = this.getUserByEmail(email);
        if (user) {
            if (userLinks[this.state.currentUserId] === undefined) {
                userLinks[this.state.currentUserId] = [];
            }

            userLinks[this.state.currentUserId].push(user.UserId)
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
        event.UserId = this.state.currentUserId;
        this.state.events.push(event);
        this.triggerStore();
    },

    getNextEventId: function () {
        return highestEventId++;
    },

    onRemoveEventForCurrentUser: function (eventId) {
        this.state.events = this.state.events.filter(function (event) {
            return event.id !== eventId;
        });
        this.triggerStore();
    }
};