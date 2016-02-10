define(
    [
        'react',
        'jsx!React/Components/Account/RegisterForm'
    ],
    function (
        React,
        RegisterForm
    ) {
        var MainAccountPanel = React.createClass({

            propTypes: {
                user: React.PropTypes.object.isRequired
            },

            render: function () {
                return (
                    <RegisterForm
                        initialName={this.props.user.name}
                        initialEmail={this.props.user.email}
                        initialPassword={this.props.user.password} />
                );
            }
        });

        return MainAccountPanel;
    });