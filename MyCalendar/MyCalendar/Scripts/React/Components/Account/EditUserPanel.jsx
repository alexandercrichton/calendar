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
                        <Calendar events={this.state.events}/>
                    </div>
                );
            }
        });

        return EditUserPanel;
    });