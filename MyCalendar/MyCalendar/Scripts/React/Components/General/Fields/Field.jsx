define(
    [
        'react'
    ],
    function (
        React
    ) {
        var Field = React.createClass({

            propTypes: {
                label: React.PropTypes.string.isRequired,
                element: React.PropTypes.object.isRequired
            },

            render: function () {
                return (
                    <div>
                        <p>{this.props.label}</p>
                        {this.props.element}
                    </div>
                );
            }
        });

        return Field;
    });