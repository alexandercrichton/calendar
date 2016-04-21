import React from "react";

import Field from "./Field.jsx";
import TextBox from "../Elements/TextBox.jsx";

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
                    <TextBox
                        value={this.props.value}
                        onChange={this.props.onChange} />
                } />
        );
    }
});