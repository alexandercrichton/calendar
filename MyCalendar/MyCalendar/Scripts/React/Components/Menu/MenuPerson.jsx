define(
    [
        'react',
        "Actions"
    ],
    function (
        React,
        Actions
    ) {
        var MenuPerson = React.createClass({

            propTypes: {
                userId: React.PropTypes.number.isRequired,
                name: React.PropTypes.string.isRequired,
                isSelected: React.PropTypes.bool.isRequired
            },

            render: function () {
                var className;
                if (this.props.isSelected) {
                    className = "person-selected";
                }

                return (
                    <a href="/" onClick={this.onClick}>
                        <p className={className}>{this.props.name}</p>
                    </a>
                );
            },

            onClick: function (e) {
                e.preventDefault();
                Actions.viewPerson(this.props.userId);
            }
        });

        return MenuPerson;
    });