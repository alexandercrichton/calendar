define(
    [
        'react',
        "reflux",
        "Store",
        'jsx!React/Components/Account/EditUserForm',
        'jsx!React/Components/Calendar/Calendar'
    ],
    function (
        React,
        Reflux,
        Store,
        EditUserForm,
        Calendar
    ) {
        var EditUserPanel = React.createClass({

            propTypes: {},

            mixins: [Reflux.connect(Store)],

            render: function () {
                var user = this.state.getCurrentUser();

                return (
                    <div>
                        <EditUserForm initialName={user.name}
                                      initialEmail={user.email}
                                      initialPassword={user.password} />
                        <Calendar currentUserId={user.userId}
                                  events={this.getEventsForCurrentUser()} />
                    </div>
                );
            },

            getEventsForCurrentUser: function () {
                return this.state.events.filter(function (event) {
                    return (event.userId === this.state.getCurrentUser().userId);
                }.bind(this));
            }
        });

        return EditUserPanel;
    });