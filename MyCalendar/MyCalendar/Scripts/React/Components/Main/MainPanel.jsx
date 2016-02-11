define(
    [
        'react',
        'reflux',
        'Store',
        'jsx!React/Components/Account/EditUserPanel'
    ],
    function (
        React,
        Reflux,
        Store,
        EditUserPanel
    ) {
        var MainPanel = React.createClass({

            propTypes: {},

            mixins: [Reflux.connect(Store)],

            render: function () {

                var panel;
                if (this.state.ui.mainPanel === 1) {
                    var currentUser = this.state.getCurrentUser();
                    if (currentUser) {
                        panel = (<EditUserPanel user={currentUser } />);
                    }
                }

                return (
                    <div>
                        {panel}
                    </div>
                );
            }
        });

        return MainPanel;
    });