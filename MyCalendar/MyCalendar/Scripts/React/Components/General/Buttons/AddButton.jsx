define(
    [
        'react',
        'jsx!React/Components/General/Elements/Button'
    ],
    function (
        React,
        Button
    ) {
        var AddButton = React.createClass({

            propTypes: {
                onClick: React.PropTypes.func.isRequired
            },

            render: function () {
                return (
                    <Button label="Add" onClick={this.props.onClick} />
                );
            }
        });

        return AddButton;
    });