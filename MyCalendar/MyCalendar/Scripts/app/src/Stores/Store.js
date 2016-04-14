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

let allUsers = [
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

let userLinks = {};

let person1Links = [
    allUsers[1].userId
];
userLinks[allUsers[0].userId] = person1Links;

let highestEventId = 1;

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
            let links = userLinks[this.state.currentUserId];
            if (links) {
                for (let i = 0; i < links.length; i++) {
                    this.state.users.push(this.getUserById(links[i]));
                }
            }
        },

        getUserById: function (userId) {
            for (let i = 0; i < allUsers.length; i++) {
                let user = allUsers[i];
                if (user.userId === userId) {
                    return user;
                }
            }

            return null;
        },

        getUserByEmail: function (email) {
            for (let i = 0; i < allUsers.length; i++) {
                let user = allUsers[i];
                if (user.email === email) {
                    return user;
                }
            }

            return null;
        },

        getUserByEmailPassword: function (email, password) {
            for (let i = 0; i < allUsers.length; i++) {
                let user = allUsers[i];
                if (user.email === email && user.password === password) {
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
