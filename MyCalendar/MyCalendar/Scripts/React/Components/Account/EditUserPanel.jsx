define(
    [
        'react',
        'jsx!React/Components/Account/EditUserForm',
        'jsx!React/Components/Calendar/Calendar'
    ],
    function (
        React,
        EditUserForm,
        Calendar
    ) {
        var EditUserPanel = React.createClass({

            propTypes: {
                user: React.PropTypes.object.isRequired
            },

            render: function () {
                return (
                    <div>
                        <EditUserForm initialName={this.props.user.name}
                                      initialEmail={this.props.user.email}
                                      initialPassword={this.props.user.password} />
                        <Calendar />
                    </div>
                );
            }
        });

        return EditUserPanel;
    });