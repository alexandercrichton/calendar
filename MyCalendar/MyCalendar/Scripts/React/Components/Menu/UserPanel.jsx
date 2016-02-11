define(
    [
        'react',
        'Actions',
        'jsx!React/Components/General/Elements/Button'
    ],
    function (
        React,
        Actions,
        Button
    ) {
        var UserPanel = React.createClass({

            propTypes: {},

            render: function () {
                return (
                    <div>
                        <Button label="Details" onClick={this.onDetailsClick} />
                        <Button label="Logout" onClick={Actions.logout} />
                    </div>
                );
            },

            onDetailsClick: function () {
                Actions.setMainPanel(1);
            }
        });

        return UserPanel;
    });