define(
    [
        'react',
        'jsx!React/Components/Menu/MenuPerson'
    ],
    function (
        React,
        MenuPerson
    ) {
        var MenuPeoplePanel = React.createClass({

            propTypes: {
                users: React.PropTypes.array.isRequired,
                selectedUserId: React.PropTypes.number
            },

            render: function () {
                if (this.props.users) {
                    return (
                        <div>
                            {this.renderPeople()}
                        </div>
                    );
                }
            },

            renderPeople: function () {
                return this.props.users.map(function (user, i) {
                    return (
                        <MenuPerson name={user.name} userId={user.userId} key={i}
                                    isSelected={this.props.selectedUserId === user.userId} />
                    );
                }, this)
            }
        });

        return MenuPeoplePanel;
    });