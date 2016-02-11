define(
    [
        'react',
        'jsx!React/Components/People/Person'
    ],
    function (
        React,
        Person
    ) {
        var MenuPeoplePanel = React.createClass({

            propTypes: {
                users: React.PropTypes.array.isRequired
            },

            render: function () {
                return (
                    <div>
                        {this.renderPeople()}
                    </div>
                );
            },

            renderPeople: function () {
                return this.props.users.map(function (user, i) {
                    return (
                        <Person user={user} key={i} />
                    );
                })
            }
        });

        return MenuPeoplePanel;
    });