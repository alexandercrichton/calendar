﻿define(
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
        var AccountPanel = React.createClass({

            propTypes: {
                currentUser: React.PropTypes.object
            },

            render: function () {
                return (
                    <div>
                        {this.renderCurrentSection()}
                    </div>
                );
            },

            renderCurrentSection: function () {
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

        return AccountPanel;
    });