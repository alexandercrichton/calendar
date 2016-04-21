import React from "react";
import Reflux from "reflux";

import Store from "../../Stores/Store";
import * as Constants from "../../Constants";

import MenuAccountPanel from "./MenuAccountPanel.jsx";
import MenuPeoplePanel from "./MenuPeoplePanel.jsx";
import MenuGroupsPanel from "./MenuGroupsPanel.jsx";

export default React.createClass({

    propTypes: {},

    mixins: [Reflux.connect(Store, "data")],

    render: function () {
        return (
            this.renderCurrentPanel()
        );
    },

    renderCurrentPanel: function () {
        if (this.state.data.ui.menuPanel === Constants.Panel.Menu.ACCOUNT) {
            return (
                <MenuAccountPanel 
                    currentUser={this.state.data.getCurrentUser()} 
                />
            );
        } else if (this.state.data.ui.menuPanel === Constants.Panel.Menu.PEOPLE) {
            return (
                <MenuPeoplePanel 
                    users={this.state.data.getOtherUsers()} 
                    selectedUserId={this.state.data.currentSelectedUserId} 
                />
            );
        } else {
            return (
                <MenuGroupsPanel 
                    groups={this.state.data.groups} 
                />
            );
        }
    }
});
