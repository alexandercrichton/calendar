import React from "react";

import Group from "../Groups/Group.jsx";
export default React.createClass({

    propTypes: {
        groups: React.PropTypes.array.isRequired
    },

    render: function () {
        return (
            <div>
                {this.renderGroups()}
            </div>
        );
    },

    renderGroups: function () {
        return this.props.groups.map(function (group, i) {
            return (
                <Group group={group} key={i} />
            );
        })
    }
});
