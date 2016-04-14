import $ from "jquery";

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
            this.onSetMenuPanel(MENU_PANEL.ACCOUNT);
        }
    },

    onShowMenuPeoplePanel: function () {
        if (this.isUserLoggedIn()) {
            this.onSetMenuPanel(MENU_PANEL.PEOPLE);
        }
    },

    onShowMenuGroupsPanel: function () {
        if (this.isUserLoggedIn()) {
            this.onSetMenuPanel(MENU_PANEL.GROUPS);
        }
    },

    onSetMainPanel: function (panel) {
        if (this.isUserLoggedIn()) {
            this.state.ui.mainPanel = panel;
            this.triggerStore();
        }
    },

    onShowMainPersonPanel: function () {
        this.onSetMainPanel(MAIN_PANEL.PERSON);
    },

    onViewPerson: function (userId) {
        if (this.isUserLoggedIn()) {
            var user = this.getUserById(userId);
            if (user) {
                this.state.currentSelectedUserId = user.userId;
                this.onShowMainPersonPanel();
                this.triggerStore();
            }
        }
    }
};