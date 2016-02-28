define(
    [
        'react',
        'jsx!React/Components/People/PersonForm',
        'jsx!React/Components/Calendar/Calendar'
    ],
    function (
        React,
        PersonForm,
        Calendar
    ) {
        var PersonPanel = React.createClass({

            propTypes: {
                currentUserId: React.PropTypes.number.isRequired,
                selectedUser: React.PropTypes.object.isRequired,
                combinedEvents: React.PropTypes.array.isRequired
            },

            render: function () {
                return (
                    <div>
                        <PersonForm name={this.props.selectedUser.name}
                                    email={this.props.selectedUser.email} />
                        <Calendar currentUserId={this.props.currentUserId}
                                  events={this.props.combinedEvents} />
                    </div>
                );
            }
        });

        return PersonPanel;
    });