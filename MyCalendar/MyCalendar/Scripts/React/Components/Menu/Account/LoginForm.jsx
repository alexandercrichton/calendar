define(
    [
        'react',
        'jsx!React/Components/General/Fields/TextBoxField'
    ],
    function (
        React,
        TextBoxField
    ) {
        var LoginForm = React.createClass({

            propTypes: {},

            render: function () {
                return (
                    <div>
                        <TextBoxField label='Email' />
                        <TextBoxField label='Password' />
                    </div>
                );
            }
        });

        return LoginForm;
    });