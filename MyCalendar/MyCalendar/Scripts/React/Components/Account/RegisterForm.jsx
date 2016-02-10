define(
    [
        'react',
        'Actions',
        'jsx!React/Components/General/Fields/TextBoxField',
        'jsx!React/Components/General/Buttons/RegisterButton'
    ],
    function (
        React,
        Actions,
        TextBoxField,
        RegisterButton
    ) {
        var RegisterForm = React.createClass({

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
                        <TextBoxField label='Name' onChange={this.onNameChanged} />
                        <TextBoxField label='Email' onChange={this.onEmailChanged} />
                        <TextBoxField label='Password' onChange={this.onPasswordChanged} />
                        <RegisterButton onClick={this.onRegister} />
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

            onRegister: function () {
                Actions.register({
                    name: this.state.name,
                    email: this.state.email,
                    password: this.state.password
                });
            }
        });

        return RegisterForm;
    });