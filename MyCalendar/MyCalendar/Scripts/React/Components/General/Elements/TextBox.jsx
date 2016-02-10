﻿define(
    [
        'react'
    ],
    function (
        React
    ) {
        var TextBox = React.createClass({

            propTypes: {
                value: React.PropTypes.string,
                onChange: React.PropTypes.func
            },

            render: function () {
                return (
                    <input type="text" value={this.props.value} onChange={this.onChange} />
                );
            },

            onChange: function (e) {
                e.preventDefault();
                this.props.onChange(e.target.value);
            }
        });

        return TextBox;
    });