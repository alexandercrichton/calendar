define(
    [
        'react',
        'jsx!React/Components/Account/LoginForm',
        'jsx!React/Components/Account/RegisterForm'
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