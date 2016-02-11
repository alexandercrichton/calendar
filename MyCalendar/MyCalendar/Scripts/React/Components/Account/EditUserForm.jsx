﻿define(
    [
        'react',
        'Actions',
        'jsx!React/Components/General/Fields/TextBoxField',
        'jsx!React/Components/General/Buttons/SaveButton'
    ],
    function (
        React,
        Actions,
        TextBoxField,
        SaveButton
    ) {
        var EditUserForm = React.createClass({

            propTypes: {
                initialName: React.PropTypes.string,
                initialEmail: React.PropTypes.string,
                initialPassword: React.PropTypes.string
            },

            getInitialState: function () {
                return {
                    name: this.props.initialName || '',
                    email: this.props.initialEmail || '',
                    password: this.props.initialPassword || ''
                };
            },

            render: function () {
                return (
                    <div>
                        <TextBoxField label='Name' value={this.state.name} onChange={this.onNameChanged } />
                        <TextBoxField label='Email' value={this.state.email} onChange={this.onEmailChanged} />
                        <TextBoxField label='Password' value={this.state.password} onChange={this.onPasswordChanged} />
                        <SaveButton onClick={this.onSave} />
                    </div>
                );
            },

            onNameChanged: function (name) {
                this.setState({
                    name: name
                });
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

            onSave: function () {
                Actions.saveUserDetails({
                    name: this.state.name,
                    email: this.state.email,
                    password: this.state.password
                });
            }
        });

        return EditUserForm;
    });