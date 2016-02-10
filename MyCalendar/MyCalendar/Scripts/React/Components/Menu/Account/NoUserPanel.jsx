define(
    [
        'react',
        'jsx!React/Components/Menu/Account/LoginForm',
        'jsx!React/Components/Menu/Account/RegisterForm'
    ],
    function (
        React,
        LoginForm,
        RegisterForm
    ) {
        var NoUserPanel = React.createClass({

            propTypes: {},

            render: function () {
                return (
                    <div>
                        <LoginForm />
                        <RegisterForm />
                    </div>
                );
            }
        });

        return NoUserPanel;
    });