define(
    [
        'react',
        'jsx!React/Components/General/Elements/Button'
    ],
    function (
        React,
        Button
    ) {
        var RemoveButton = React.createClass({

            propTypes: {
                onClick: React.PropTypes.func.isRequired
            },

            render: function () {
                return (
                    <Button label="Remove" onClick={this.props.onClick} />
                );
            }
        });

        return RemoveButton;
    });