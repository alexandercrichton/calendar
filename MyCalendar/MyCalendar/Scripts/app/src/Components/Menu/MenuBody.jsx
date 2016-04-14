import React from "react";
import Reflux from "reflux";

import Store from "../../Stores/Store";

import MenuAccountPanel from "./MenuAccountPanel.jsx";
import MenuPeoplePanel from "./MenuPeoplePanel.jsx";
import MenuGroupsPanel from "./MenuGroupsPanel.jsx";

export default React.createClass({

    propTypes: {},

    mixins: [Reflux.connect(Store, "data")],

    render: function () {
        return (
            <div>
                {this.renderCurrentPanel()}
            </div>
        );
    },

    renderCurrentPanel: function () {
        if (this.state.data.ui.menuPanel === 1) {
            return (
                <MenuAccountPanel currentUser={this.state.data.getCurrentUser()} />
            );
        } else if (this.state.data.ui.menuPanel === 2) {
            return (
                <MenuPeoplePanel users={this.state.data.users} selectedUserId={this.state.data.currentSelectedUserId} />
            );
        } else {
            return (
                <MenuGroupsPanel groups={this.state.data.groups} />
            );
        }
    }
});
