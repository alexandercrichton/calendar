define(
    [
        'react',
        'reflux',
        'Store',
        'jsx!React/Components/Account/EditUserPanel',
        'jsx!React/Components/People/PersonPanel'
    ],
    function (
        React,
        Reflux,
        Store,
        EditUserPanel,
        PersonPanel
    ) {
        var MainPanel = React.createClass({

            propTypes: {},

            mixins: [Reflux.connect(Store)],

            render: function () {

                var panel;
                if (this.state.ui.mainPanel === 1) {
                    var currentUser = this.state.getCurrentUser();
                    if (currentUser) {
                        panel = <EditUserPanel user={currentUser } />;
                    }
                }
                else if (this.state.ui.mainPanel === 2) {
                    var selectedUser = this.state.getCurrentSelectedUser();
                    if (selectedUser) {
                        panel = <PersonPanel user={selectedUser } />;
                    }
                }

                return (
                    <div>
                        {panel}
                    </div>
                );
            }
        });

        return MainPanel;
    });