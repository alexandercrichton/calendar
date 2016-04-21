import React from "react";

import Actions from "../../Actions/Actions";

import RemoveButton from "../General/Buttons/RemoveButton.jsx";

export default React.createClass({

    propTypes: {
        userId: React.PropTypes.number.isRequired,
        name: React.PropTypes.string.isRequired,
        isSelected: React.PropTypes.bool.isRequired
    },

    render: function () {
        var className;
        if (this.props.isSelected) {
            className = "person-selected";
        }

        return (
            <a href="/" onClick={this.onClick}>
                <p className={className}>{this.props.name}</p>
                <RemoveButton onClick={this.onRemove} />
            </a>
        );
    },

    onClick: function (e) {
        e.preventDefault();
        Actions.viewPerson(this.props.userId);
    },

    onRemove: function (e) {
        e.preventDefault();
        Actions.removeLinkForPerson(this.props.userId);
    }
});