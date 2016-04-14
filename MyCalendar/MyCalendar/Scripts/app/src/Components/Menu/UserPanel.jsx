import React from "react";

import Actions from "../../Actions/Actions";

import Button from "../General/Elements/Button.jsx";

export default React.createClass({

    propTypes: {},

    render: function () {
        return (
            <div>
                <Button label="Details" onClick={this.onDetailsClick} />
                <Button label="Logout" onClick={Actions.logout} />
            </div>
        );
    },

    onDetailsClick: function () {
        Actions.setMainPanel(1);
    }
});