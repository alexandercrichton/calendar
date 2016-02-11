define(
    [
        'react',
        'jsx!React/Components/Account/EditUserForm'
    ],
    function (
        React,
        EditUserForm
    ) {
        var EditUserPanel = React.createClass({

            propTypes: {
                user: React.PropTypes.object.isRequired
            },

            render: function () {
                return (
                    <EditUserForm initialName={this.props.user.name}
                                  initialEmail={this.props.user.email}
                                  initialPassword={this.props.user.password} />
                );
            }
        });

        return EditUserPanel;
    });