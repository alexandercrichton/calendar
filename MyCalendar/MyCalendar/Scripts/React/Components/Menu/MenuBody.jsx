define(
    [
        'react',
        'reflux',
        'Store',
        'jsx!React/Components/Menu/AccountPanel',
        'jsx!React/Components/Menu/PeoplePanel',
        'jsx!React/Components/Menu/GroupPanel'
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
                        <AccountPanel currentUser={this.state.getCurrentUser()} />
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