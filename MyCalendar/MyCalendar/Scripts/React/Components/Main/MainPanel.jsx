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
                var currentUser = this.state.getCurrentUser();
                if (this.state.ui.mainPanel === 1) {
                    if (currentUser) {
                        panel = (<EditUserPanel currentUser={currentUser}
                                                currentUserEvents={this.state.getEventsForCurrentUser()}/>);
                    }
                }
                else if (this.state.ui.mainPanel === 2) {
                    var selectedUser = this.state.getCurrentSelectedUser();
                    if (selectedUser && currentUser) {
                        panel = <PersonPanel currentUserId={currentUser.userId}
                                             selectedUser={selectedUser } 
                                             combinedEvents={this.state.getCombinedEventsWithSelectedUser()}/>;
                    }
                }

                return (
                    <div className="main-panel">
                        {panel}
                    </div>
                );
            }
        });

        return MainPanel;
    });