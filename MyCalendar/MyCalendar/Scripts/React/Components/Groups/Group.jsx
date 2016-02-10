define(
    [
        'react'
    ],
    function (
        React
    ) {
        var Group = React.createClass({

            propTypes: {
                group: React.PropTypes.object.isRequired
            },

            render: function () {
                return (
                    <p>{this.props.group.name}</p>
                );
            }
        });

        return Group;
    });