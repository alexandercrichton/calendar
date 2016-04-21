import $ from "jquery";

import * as Constants from "../Constants";

export default {

    isUserLoggedIn: function () {
        return this.state.currentUserId > 0;
    },

    onRegister: function (registerFields) {
        var user = {
            Name: registerFields.name,
            Email: registerFields.email,
            Password: registerFields.password
        };

        $.post("Account/Register", user)
            .done(function (data) {
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
            .fail((data) => {
                console.log("postUserDetails fail", data);
            });
    },

    onLinkCurrentUserToUserByEmail: function (email) {
        const postData = {
            fromUserId: this.state.currentUserId,
            toEmail: email
        };

        $.post("Account/LinkUserToUserByEmail", postData)
            .done((linkedUser) => {
                if (linkedUser) {
                    this.state.users.push(linkedUser);
                    this.triggerStore();
                }
            });
    },

    onRemoveLinkForPerson: function (userId) {
        const removedUser = this.removeUserById(userId);
        if (removedUser) {
            this.triggerStore();

            const postData = {
                fromUserId: this.state.currentUserId,
                toUserId: userId
            };

            $.post("Account/UnlinkUserFromUser", postData)
        }
    },

    getUserById: function (userId) {
        for (let i = 0; i < this.state.users.length; i++) {
            let user = this.state.users[i];
            if (user.UserId === userId) {
                return user;
            }
        }

        return null;
    },

    getUserByEmail: function (email) {
        for (let i = 0; i < this.state.users.length; i++) {
            let user = this.state.users[i];
            if (user.Email === email) {
                return user;
            }
        }

        return null;
    },

    removeUserById: function (id) {
        const index = this.getIndexofUserById(id);
        if (index) {
            return this.state.users.splice(index, 1);
        }

        return null;
    },

    getIndexofUserById: function (id) {
        for (let i = 0; i < this.state.users.length; i++) {
            if (this.state.users[i].UserId === id) {
                return i;
            }
        }

        return -1;
    },

    getOtherUsers: function () {
        return this.state.users.filter((user) => {
            return (user.UserId !== this.state.currentUserId);
        }, this);
    }
};