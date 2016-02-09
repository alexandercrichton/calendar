define(
    [
        'react',
        'Actions',
        'jsx!React/Components/General/Buttons/LogoutButton'
    ],
    function (
        React,
        Actions,
        LogoutButton
    ) {
        var LogoutForm = React.createClass({

            propTypes: {
                onLogout: React.PropTypes.func.isRequired
            },

            render: function () {
                return (
                    <LogoutButton onClick={this.onLogout} />
                );
            },

            onLogout: function () {
                Actions.logout();
            }
        });

        return LogoutForm;
    });