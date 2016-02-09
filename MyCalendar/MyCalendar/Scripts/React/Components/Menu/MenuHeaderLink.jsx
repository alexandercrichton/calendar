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
                var className;
                if (this.props.isSelected) {
                    className = "menu-header-option-select";
                }

                return (
                    <a className={className} href='/' onClick={this.onClick}>
                        <div className="menu-header-option">{this.props.label}</div>
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