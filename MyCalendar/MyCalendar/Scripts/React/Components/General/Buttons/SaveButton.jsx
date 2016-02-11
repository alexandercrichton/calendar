define(
    [
        'react',
        'jsx!React/Components/General/Elements/Button'
    ],
    function (
        React,
        Button
    ) {
        var SaveButton = React.createClass({

            propTypes: {
                onClick: React.PropTypes.func.isRequired
            },

            render: function () {
                return (
                    <Button label="Save" onClick={this.props.onClick} />
                );
            }
        });

        return SaveButton;
    });