import React from "react";

import Actions from "../../Actions/Actions";

import LogoutButton from "../General/Buttons/LogoutButton.jsx";

export default React.createClass({

    render: function () {
        return (
            <LogoutButton onClick={this.onLogout} />
        );
    },

    onLogout: function () {
        Actions.logout();
    }
});