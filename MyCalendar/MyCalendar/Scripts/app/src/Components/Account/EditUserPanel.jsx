import React from "react";
import Reflux from "reflux";

import EditUserForm from "./EditUserForm.jsx";
import Calendar from "../Calendar/Calendar.jsx";

export default React.createClass({

    propTypes: {
        currentUser: React.PropTypes.object.isRequired,
        currentUserEvents: React.PropTypes.array.isRequired
    },

    render: function () {
        return (
            <div>
                <EditUserForm initialName={this.props.currentUser.name}
                              initialEmail={this.props.currentUser.email}
                              initialPassword={this.props.currentUser.password} />
                <Calendar currentUserId={this.props.currentUser.userId}
                          events={this.props.currentUserEvents} />
            </div>
        );
    }
});