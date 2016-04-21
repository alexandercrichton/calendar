import $ from "jquery";

import * as Constants from "../Constants";

export default {
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
            this.onSetMenuPanel(Constants.Panel.Menu.ACCOUNT);
        }
    },

    onShowMenuPeoplePanel: function () {
        if (this.isUserLoggedIn()) {
            this.onSetMenuPanel(Constants.Panel.Menu.PEOPLE);
        }
    },

    onShowMenuGroupsPanel: function () {
        if (this.isUserLoggedIn()) {
            this.onSetMenuPanel(Constants.Panel.Menu.GROUPS);
        }
    },

    onSetMainPanel: function (panel) {
        if (this.isUserLoggedIn()) {
            this.state.ui.mainPanel = panel;
            this.triggerStore();
        }
    },

    onShowMainPersonPanel: function () {
        this.onSetMainPanel(Constants.Panel.Main.PERSON);
    },

    onViewPerson: function (userId) {
        if (this.isUserLoggedIn()) {
            var user = this.getUserById(userId);
            if (user) {
                this.state.currentSelectedUserId = user.UserId;
                this.onShowMainPersonPanel();
                this.triggerStore();
            }
        }
    }
};