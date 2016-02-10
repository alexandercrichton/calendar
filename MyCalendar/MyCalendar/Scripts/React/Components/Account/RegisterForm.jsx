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

            propTypes: {
                initialName: React.PropTypes.string,
                initialEmail: React.PropTypes.string,
                initialPassword: React.PropTypes.string
            },

            getInitialState: function () {
                return {
                    name: this.props.initialName || '',
                    email: this.props.initialEmail || '',
                    password: this.props.password || ''
                };
            },

            render: function () {
                return (
                    <div>
                        <TextBoxField label='Name' value={this.state.name} onChange={this.onNameChanged } />
                        <TextBoxField label='Email' value={this.state.email} onChange={this.onEmailChanged} />
                        <TextBoxField label='Password' value={this.state.password} onChange={this.onPasswordChanged} />
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