define(
    [
        'react',
        'jsx!React/Components/Menu/UserPanel',
        'jsx!React/Components/Menu/NoUserPanel'
    ],
    function (
        React,
        UserPanel,
        NoUserPanel
    ) {
        var MenuAccountPanel = React.createClass({

            propTypes: {
                currentUser: React.PropTypes.object
            },

            render: function () {
                return (
                    <div>
                        {this.renderCurrentPanel()}
                    </div>
                );
            },

            renderCurrentPanel: function () {
                if (this.isCurrentUser()) {
                    return (<UserPanel currentUser={this.props.currentUser } />);
                } else {
                    return (<NoUserPanel />);
                }
            },

            isCurrentUser: function () {
                return (this.props.currentUser);
            }
        });

        return MenuAccountPanel;
    });