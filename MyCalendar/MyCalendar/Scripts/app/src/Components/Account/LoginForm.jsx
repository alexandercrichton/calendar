import React from "react";

import Actions from "../../Actions/Actions";

import TextBoxField from "../General/Fields/TextBoxField.jsx";
import LoginButton from "../General/Buttons/LoginButton.jsx";

export default React.createClass({

    propTypes: {},

    getInitialState: function () {
        return {
            name: '',
            email: '',
            password: ''
        };
    },

    render: function () {
        return (
            <div>
                <TextBoxField label='Email' onChange={this.onEmailChanged} />
                <TextBoxField label='Password' onChange={this.onPasswordChanged} />
                <LoginButton onClick={this.onLogin} />
            </div>
        );
    },

    onEmailChanged: function (email) {
        this.setState({
            email: email
        });
    },

    onPasswordChanged: function (password) {
        this.setState({
            password: password
        });
    },

    onLogin: function () {
        Actions.login({
            email: this.state.email,
            password: this.state.password
        });
    }
});