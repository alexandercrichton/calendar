import Reflux from "reflux";
import $ from "jquery";

import Actions from "../Actions/Actions";
import * as Constants from "../Constants";

import StoreViewExtensions from "./StoreViewExtensions";
import StoreAccountExtensions from "./StoreAccountExtensions";
import StoreEventExtensions from "./StoreEventExtensions";

let Store = $.extend(
    {}, 
    StoreViewExtensions, 
    StoreAccountExtensions,
    StoreEventExtensions,
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

                getOtherUsers: this.getOtherUsers,

                groups: [],

                events: [],

                getEventsForCurrentUser: () => {
                    const user = this.getUserById(this.state.currentUserId);
                    return user.Events;
                },

                getCombinedEventsWithSelectedUser: function () {
                    const users = this.state.users.filter((user) => {
                        return user.UserId === this.state.currentUserId
                            || user.UserId === this.state.currentSelectedUserId;
                    });

                    const eventLists = users.map((user) => {
                        return user.Events;
                    });

                    return [].concat.apply([], eventLists);
                }.bind(this)
            };
        },

        getInitialState: function () {
            return this.state;
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

        triggerStore: function () {
            this.trigger(this.state);
        }
    }
);

export default Reflux.createStore(Store);
