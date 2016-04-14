import React from "react";

export default React.createClass({

    propTypes: {
        group: React.PropTypes.object.isRequired
    },

    render: function () {
        return (
            <p>{this.props.group.name}</p>
        );
    }
});