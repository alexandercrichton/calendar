import React from "react";

import UserPanel from "./UserPanel.jsx";
import NoUserPanel from "./NoUserPanel.jsx";

export default React.createClass({

    propTypes: {
        currentUser: React.PropTypes.object
    },

    render: function () {
        return (
            <div>
                {this.renderCurrentPanel()}
            </div>
        );
    },

    renderCurrentPanel: function () {
        if (this.isCurrentUser()) {
            return (<UserPanel currentUser={this.props.currentUser } />);
        } else {
            return (<NoUserPanel />);
        }
    },

    isCurrentUser: function () {
        return (this.props.currentUser);
    }
});
