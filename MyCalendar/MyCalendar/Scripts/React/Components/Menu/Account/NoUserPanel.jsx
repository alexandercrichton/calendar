define(
    [
        'react',
        'jsx!React/Components/Menu/Account/LoginForm'
    ],
    function (
        React,
        LoginForm
    ) {
        var NoUserPanel = React.createClass({

            propTypes: {},

            render: function () {
                return (
                    <div>
                        <LoginForm />
                    </div>
                );
            }
        });

        return NoUserPanel;
    });