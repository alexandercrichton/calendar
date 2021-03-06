﻿import React from "react";

export default React.createClass({

    propTypes: {
        label: React.PropTypes.string.isRequired,
        onClick: React.PropTypes.func.isRequired,
        tooltip: React.PropTypes.string
    },

    render: function () {
        return (
            <button title={this.props.tooltip} onClick={this.props.onClick}>{this.props.label}</button>
        );
    }
});