define(
    [
        'react',
        'Actions',
        'jsx!React/Components/General/Fields/TextBoxField',
        'jsx!React/Components/General/Buttons/LoginButton'
    ],
    function (
        React,
        Actions,
        TextBoxField,
        LoginButton
    ) {
        var LoginForm = React.createClass({

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

        return LoginForm;
    });