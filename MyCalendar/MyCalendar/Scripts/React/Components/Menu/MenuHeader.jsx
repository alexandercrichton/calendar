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
                                        onClick={function() { Actions.setMenuSection(1);}}
                                        isSelected={(this.state.ui.menuPanel === 1)} />
                        <MenuHeaderLink label="People"
                                        onClick={function() { Actions.setMenuSection(2);}} 
                                        isSelected={(this.state.ui.menuPanel === 2)} />
                        <MenuHeaderLink label="Groups"
                                        onClick={function() { Actions.setMenuSection(3);}} 
                                        isSelected={(this.state.ui.menuPanel === 3)} />
                    </div>
                );
            }
        });

        return MenuHeader;
    });