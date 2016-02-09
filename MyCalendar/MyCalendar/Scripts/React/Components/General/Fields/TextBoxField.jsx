define(
    [
        'react',
        'jsx!React/Components/General/Fields/Field',
        'jsx!React/Components/General/Elements/TextBox'
    ],
    function (
        React,
        Field,
        TextBox
    ) {
        var TextBoxField = React.createClass({

            propTypes: {
                label: React.PropTypes.string.isRequired,
                value: React.PropTypes.string,
                onChange: React.PropTypes.func
            },

            render: function () {
                return (
                    <Field label={this.props.label}
                           element={
                            <TextBox
                                value={this.props.value}
                                onChange={this.props.onChange} />
                        } />
                );
            }
        });

        return TextBoxField;
    });