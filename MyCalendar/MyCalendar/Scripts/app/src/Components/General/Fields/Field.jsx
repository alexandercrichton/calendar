import React from "react";

export default React.createClass({

    propTypes: {
        label: React.PropTypes.string.isRequired,
        element: React.PropTypes.object.isRequired
    },

    render: function () {
        return (
            <div>
                <p>{this.props.label}</p>
                {this.props.element}
            </div>
        );
    }
});