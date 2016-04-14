﻿import React from "react";
import Reflux from "reflux";

import Store from "../../Stores/Store";

import EditUserPanel from "../Account/EditUserPanel.jsx";
import PersonPanel from "../People/PersonPanel.jsx";

export default React.createClass({

    propTypes: {},

    mixins: [Reflux.connect(Store, "data")],

    render: function () {

        var panel;
        var currentUser = this.state.data.getCurrentUser();
        if (this.state.data.ui.mainPanel === 1) {
            if (currentUser) {
                panel = (<EditUserPanel currentUser={currentUser}
                                        currentUserEvents={this.state.data.getEventsForCurrentUser()}/>);
            }
        }
        else if (this.state.data.ui.mainPanel === 2) {
            var selectedUser = this.state.data.getCurrentSelectedUser();
            if (selectedUser && currentUser) {
                panel = <PersonPanel currentUserId={currentUser.userId}
                                     selectedUser={selectedUser } 
                                     combinedEvents={this.state.data.getCombinedEventsWithSelectedUser()}/>;
            }
        }

        return (
            <div className="main-panel">
                {panel}
            </div>
        );
    }
});