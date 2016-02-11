define(
    [
        'react',
        'jsx!React/Components/People/PersonForm'
    ],
    function (
        React,
        PersonForm
    ) {
        var PersonPanel = React.createClass({

            propTypes: {
                user: React.PropTypes.object.isRequired
            },

            render: function () {
                return (
                    <PersonForm name={this.props.user.name}
                                email={this.props.user.email} />
                );
            }
        });

        return PersonPanel;
    });