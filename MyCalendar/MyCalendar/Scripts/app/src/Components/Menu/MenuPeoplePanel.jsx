import React from "react";

import Actions from "../../Actions/Actions";

import MenuPerson from "./MenuPerson.jsx";
import TextBoxField from "../General/Fields/TextBoxField.jsx";
import AddButton from "../General/Buttons/AddButton.jsx";

export default React.createClass({

    propTypes: {
        users: React.PropTypes.array.isRequired,
        selectedUserId: React.PropTypes.number
    },

    getInitialState: function () {
        return {
            selectedEmail: ""
        };
    },

    render: function () {
        if (this.props.users) {
            return (
                <div>
                    {this.renderAddPersonForm()}
                    {this.renderPeople()}
                </div>
            );
        }
    },

    renderAddPersonForm: function () {
        return (
            <div>
                <TextBoxField label='Add person by email'
                value={this.state.selectedEmail}
                onChange={this.onEmailChange } />
                <AddButton onClick={this.onAddPerson} />
            </div>
        );
    },

    onEmailChange: function (email) {
        this.setState({ selectedEmail: email });
    },

    onAddPerson: function () {
        this.setState({ selectedEmail: "" });
        Actions.addLinkToSelectedEmail(this.state.selectedEmail);
    },

    renderPeople: function () {
        return this.props.users.map(function (user, i) {
            return (
                <MenuPerson name={user.name} userId={user.userId} key={i}
                            isSelected={this.props.selectedUserId === user.userId} />
            );
        }, this)
    }
});