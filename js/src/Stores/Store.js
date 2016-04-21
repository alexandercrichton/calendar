import Reflux from "reflux";
import $ from "jquery";

import Actions from "../Actions/Actions";
import * as Constants from "../Constants";

import StoreViewExtensions from "./StoreViewExtensions";
import StoreDataExtensions from "./StoreDataExtensions";




let Store = $.extend(
    {}, 
    StoreViewExtensions, 
    StoreDataExtensions,
    {
        listenables: [Actions],

        init: function () {
            this.state = {
                ui: {
                    menuPanel: Constants.Panel.Menu.ACCOUNT,
                    mainPanel: Constants.Panel.Main.USER_DETAILS
                },

                users: [],

                currentUserId: 0,

                getCurrentUser: function () {
                    return this.getUserById(this.state.currentUserId);
                }.bind(this),

                currentSelectedUserId: 0,

                getCurrentSelectedUser: function () {
                    return this.getUserById(this.state.currentSelectedUserId);
                }.bind(this),

                groups: [],

                events: [],

                getEventsForCurrentUser: function () {
                    return this.state.events.filter(function (event) {
                        return (event.UserId === this.state.currentUserId);
                    }.bind(this));
                }.bind(this),

                getCombinedEventsWithSelectedUser: function () {
                    return this.state.events.filter(function (event) {
                        return (event.UserId === this.state.currentUserId
                            || event.UserId === this.state.currentSelectedUserId);
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

        getViewData: function (userId) {
            if (userId) {
                const done = this.applyViewData.bind(this);
                $.get("Home/GetViewData?userId=" + userId)
                    .done(done);
            }
        },

        applyViewData: function (data) {
            this.state.currentUserId = data.CurrentUserId;
            this.state.users = data.Users;
            this.onSetMenuPanel(Constants.Panel.Menu.ACCOUNT);
            this.onSetMainPanel(Constants.Panel.Main.USER_DETAILS);
            this.triggerStore();
        },

        updateUsersForCurrentUser: function () {
            this.state.users = [];
            let links = userLinks[this.state.currentUserId];
            if (links) {
                for (let i = 0; i < links.length; i++) {
                    this.state.users.push(this.getUserById(links[i]));
                }
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

        triggerStore: function () {
            this.trigger(this.state);
        }
    }
);

Store = $.extend(Store, StoreViewExtensions, StoreDataExtensions);

export default Reflux.createStore(Store);
