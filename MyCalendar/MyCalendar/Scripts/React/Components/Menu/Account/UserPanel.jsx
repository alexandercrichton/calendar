define(
    [
        'react',
        'jsx!React/Components/Menu/Account/LogoutForm'
    ],
    function (
        React,
        LogoutForm
    ) {
        var UserPanel = React.createClass({

            propTypes: {
                currentUser: React.PropTypes.object.isRequired
            },

            render: function () {
                return (
                    <div>
                        <LogoutForm />
                    </div>
                );
            }
        });

        return UserPanel;
    });