﻿import React from "react";

import Button from "../Elements/Button.jsx";

export default React.createClass({

    propTypes: {
        onClick: React.PropTypes.func.isRequired
    },

    render: function () {
        return (
            <Button label="Login" onClick={this.props.onClick} />
        );
    }
});