import React from "react";

import LabelField from "../General/Fields/LabelField.jsx";
export default React.createClass({

    propTypes: {
        name: React.PropTypes.string,
        email: React.PropTypes.string,
    },

    render: function () {
        return (
            <div>
                <LabelField label="Name" value={this.props.name} />
                <LabelField label="Email" value={this.props.email} />
            </div>
        );
    }
});