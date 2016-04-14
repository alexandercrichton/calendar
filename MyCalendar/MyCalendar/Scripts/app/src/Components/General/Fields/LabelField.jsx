import React from "react";

import Field from "./Field.jsx";
import Label from "../Elements/Label.jsx";

export default React.createClass({

    propTypes: {
        label: React.PropTypes.string.isRequired,
        value: React.PropTypes.string,
        onChange: React.PropTypes.func
    },

    render: function () {
        return (
            <Field label={this.props.label}
                   element={
                        <Label
                            value={this.props.value} />
                    } />
        );
    }
});