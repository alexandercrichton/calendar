define(
    [
        'react',
        'jsx!React/Components/General/Elements/Button'
    ],
    function (
        React,
        Button
    ) {
        var RegisterButton = React.createClass({

            propTypes: {
                onClick: React.PropTypes.func.isRequired
            },

            render: function () {
                return (
                    <Button label="Register" onClick={this.props.onClick} />
                );
            }
        });

        return RegisterButton;
    });