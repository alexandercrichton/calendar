define(
    [
        'react',
        'reflux',
        'Store',
        'jsx!React/Components/Menu/Account/AccountPanel',
        'jsx!React/Components/Menu/People/PeoplePanel',
        'jsx!React/Components/Menu/Groups/GroupPanel'
    ],
    function (
        React,
        Reflux,
        Store,
        AccountPanel,
        PeoplePanel,
        GroupPanel
    ) {
        var MenuBody = React.createClass({

            propTypes: {},

            mixins: [Reflux.connect(Store)],

            render: function () {
                return (
                    <div>
                        {this.renderCurrentPanel()}
                    </div>
                );
            },

            renderCurrentPanel: function () {
                if (this.state.ui.menuPanel === 1) {
                    return (
                        <AccountPanel currentUser={this.state.currentUser} />
                    );
                } else if (this.state.ui.menuPanel === 2) {
                    return (
                        <PeoplePanel people={this.state.people} />
                    );
                } else {
                    return (
                        <GroupPanel groups={this.state.groups} />
                    );
                }
            }
        });

        return MenuBody;
    });