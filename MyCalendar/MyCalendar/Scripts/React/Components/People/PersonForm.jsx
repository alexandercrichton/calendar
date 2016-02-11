define(
    [
        'react',
        'jsx!React/Components/General/Fields/LabelField'
    ],
    function (
        React,
        Label
    ) {
        var PersonForm = React.createClass({

            propTypes: {
                name: React.PropTypes.string,
                email: React.PropTypes.string,
            },

            render: function () {
                return (
                    <div>
                        <Label label="Name" value={this.props.name} />
                        <Label label="Email" value={this.props.email} />
                    </div>
                );
            }
        });

        return PersonForm;
    });