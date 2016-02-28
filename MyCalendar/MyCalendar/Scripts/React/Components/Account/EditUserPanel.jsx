define(
    [
        'react',
        "reflux",
        'jsx!React/Components/Account/EditUserForm',
        'jsx!React/Components/Calendar/Calendar'
    ],
    function (
        React,
        Reflux,
        EditUserForm,
        Calendar
    ) {
        var EditUserPanel = React.createClass({

            propTypes: {
                currentUser: React.PropTypes.object.isRequired,
                currentUserEvents: React.PropTypes.array.isRequired
            },

            render: function () {
                return (
                    <div>
                        <EditUserForm initialName={this.props.currentUser.name}
                                      initialEmail={this.props.currentUser.email}
                                      initialPassword={this.props.currentUser.password} />
                        <Calendar currentUserId={this.props.currentUser.userId}
                                  events={this.props.currentUserEvents} />
                    </div>
                );
            }
        });

        return EditUserPanel;
    });