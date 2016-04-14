import React from "react";

export default React.createClass({

    propTypes: {
        value: React.PropTypes.string
    },

    render: function () {
        return (
            <label>{this.props.value}</label>
        );
    },

    onChange: function (e) {
        e.preventDefault();
        this.props.onChange(e.target.value);
    }
});