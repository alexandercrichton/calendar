define(
    [
        'react',
        'jsx!React/Components/General/Fields/Field',
        'jsx!React/Components/General/Elements/Label'
    ],
    function (
        React,
        Field,
        Label
    ) {
        var LabelField = React.createClass({

            propTypes: {
                label: React.PropTypes.string.isRequired,
                value: React.PropTypes.string,
                onChange: React.PropTypes.func
            },

            render: function () {
                return (
                    <Field label={this.props.label}
                           element={
                                <Label
                                    value={this.props.value} />
                            } />
                );
            }
        });

        return LabelField;
    });