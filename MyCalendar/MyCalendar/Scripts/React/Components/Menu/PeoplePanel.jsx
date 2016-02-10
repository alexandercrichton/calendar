define(
    [
        'react',
        'jsx!React/Components/People/Person'
    ],
    function (
        React,
        Person
    ) {
        var PeoplePanel = React.createClass({

            propTypes: {
                people: React.PropTypes.array.isRequired
            },

            render: function () {
                return (
                    <div>
                        {this.renderPeople()}
                    </div>
                );
            },

            renderPeople: function () {
                return this.props.people.map(function (person, i) {
                    return (
                        <Person person={person} key={i} />
                    );
                })
            }
        });

        return PeoplePanel;
    });