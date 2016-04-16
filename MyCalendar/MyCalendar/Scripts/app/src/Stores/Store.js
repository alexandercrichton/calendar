import Reflux from "reflux";
import $ from "jquery";

import Actions from "../Actions/Actions";

import StoreViewExtensions from "./StoreViewExtensions";
import StoreDataExtensions from "./StoreDataExtensions";


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

let Store = $.extend(
    {}, 
    StoreViewExtensions, 
    StoreDataExtensions,
    {
        listenables: [Actions],

        init: function () {
            this.state = {
                ui: {
                    menuPanel: MENU_PANEL.ACCOUNT,
                    mainPanel: MAIN_PANEL.USER_DETAILS
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

        setCurrentUser: function (userId) {
            if (userId) {
                $.get("Home/GetViewData?userId=" + userId)
                    .done(function (data) {
                        console.log("GetViewData");
                        this.onSetMenuPanel(MENU_PANEL.ACCOUNT);
                        this.onSetMainPanel(MAIN_PANEL.USER_DETAILS);
                    });
            }
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

        getNextEventId: function () {
            return highestEventId++;
        },

        triggerStore: function () {
            this.trigger(this.state);
        }
    }
);

Store = $.extend(Store, StoreViewExtensions, StoreDataExtensions);

export default Reflux.createStore(Store);
