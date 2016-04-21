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
                <EditUserForm initialName={this.props.currentUser.Name}
                              initialEmail={this.props.currentUser.Email}
                              initialPassword={this.props.currentUser.Password} />
                <Calendar currentUserId={this.props.currentUser.UserId}
                          events={this.props.currentUserEvents} />
            </div>
        );
    }
});