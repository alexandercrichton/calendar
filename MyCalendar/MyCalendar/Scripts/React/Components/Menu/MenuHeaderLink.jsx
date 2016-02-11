define(
    [
        'react'
    ],
    function (
        React
    ) {
        var MenuHeaderLink = React.createClass({

            propTypes: {
                label: React.PropTypes.string.isRequired,
                onClick: React.PropTypes.func.isRequired,
                isSelected: React.PropTypes.bool.isRequired
            },

            render: function () {
                var className = "menu-header-option";
                if (this.props.isSelected) {
                    className += " menu-header-option-select";
                }

                return (
                    <a className={className} href='/' onClick={this.onClick}>
                        <div className="">{this.props.label}</div>
                    </a>
                );
            },

            onClick: function (e) {
                e.preventDefault();
                this.props.onClick();
            }
        });

        return MenuHeaderLink;
    });