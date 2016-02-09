define(
    [
        'react',
        'jsx!React/Components/General/Elements/Button'
    ],
    function (
        React,
        Button
    ) {
        var LogoutButton = React.createClass({

            propTypes: {
                onClick: React.PropTypes.func.isRequired
            },

            render: function () {
                return (
                    <Button label="Logout" onClick={this.props.onClick} />
                );
            }
        });

        return LogoutButton;
    });