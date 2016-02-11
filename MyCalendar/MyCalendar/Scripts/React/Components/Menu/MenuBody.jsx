define(
    [
        'react',
        'reflux',
        'Store',
        'jsx!React/Components/Menu/MenuAccountPanel',
        'jsx!React/Components/Menu/MenuPeoplePanel',
        'jsx!React/Components/Menu/MenuGroupsPanel'
    ],
    function (
        React,
        Reflux,
        Store,
        MenuAccountPanel,
        MenuPeoplePanel,
        MenuGroupsPanel
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
                        <MenuAccountPanel currentUser={this.state.getCurrentUser()} />
                    );
                } else if (this.state.ui.menuPanel === 2) {
                    return (
                        <MenuPeoplePanel users={this.state.users} />
                    );
                } else {
                    return (
                        <MenuGroupsPanel groups={this.state.groups} />
                    );
                }
            }
        });

        return MenuBody;
    });