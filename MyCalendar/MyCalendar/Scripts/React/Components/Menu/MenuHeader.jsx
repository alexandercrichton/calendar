define(
    [
        'react',
        'reflux',
        'Actions',
        'Store',
        'jsx!React/Components/Menu/MenuHeaderLink'
    ],
    function (
        React,
        Reflux,
        Actions,
        Store,
        MenuHeaderLink
    ) {
        var MenuHeader = React.createClass({

            propTypes: {},

            mixins: [Reflux.connect(Store)],

            render: function () {
                return (
                    <div className="menu-header">
                        <MenuHeaderLink label="Account"
                                        onClick={Actions.showMenuAccountPanel }
                                        isSelected={(this.state.ui.menuPanel === 1)} />
                        <MenuHeaderLink label="People"
                                        onClick={Actions.showMenuPeoplePanel }
                                        isSelected={(this.state.ui.menuPanel === 2)} />
                        <MenuHeaderLink label="Groups"
                                        onClick={Actions.showMenuGroupsPanel}
                                        isSelected={(this.state.ui.menuPanel === 3)} />
                    </div>
                );
            }
        });

        return MenuHeader;
    });