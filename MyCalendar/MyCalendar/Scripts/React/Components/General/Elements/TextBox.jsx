define(
    [
        'react'
    ],
    function (
        React
    ) {
        var TextBox = React.createClass({

            propTypes: {
                value: React.PropTypes.string,
                onChange: React.PropTypes.func
            },

            render: function () {
                return (
                    <input type="text" value={this.props.value} onChange={this.props.onChange} />
                );
            }
        });

        return TextBox;
    });