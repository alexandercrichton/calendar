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
                        <Button label="Details" onClick={Actions.editUser} />
                        <Button label="Logout" onClick={Actions.logout} />
                    </div>
                );
            }
        });

        return UserPanel;
    });