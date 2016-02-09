define(
    [
        'react'
    ],
    function (
        React
    ) {
        var Person = React.createClass({

            propTypes: {
                person: React.PropTypes.object.isRequired
            },

            render: function () {
                return (
                    <p>{this.props.person.name}</p>
                );
            }
        });

        return Person;
    });