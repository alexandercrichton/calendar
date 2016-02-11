define(
    [
        'react'
    ],
    function (
        React
    ) {
        var Person = React.createClass({

            propTypes: {
                user: React.PropTypes.object.isRequired
            },

            render: function () {
                return (
                    <p>{this.props.user.name}</p>
                );
            }
        });

        return Person;
    });