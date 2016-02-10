define(
    [
        'react',
        'reflux',
        'Store',
        'jsx!React/Components/Account/MainAccountPanel'
    ],
    function (
        React,
        Reflux,
        Store,
        MainAccountPanel
    ) {
        var MainPanel = React.createClass({

            propTypes: {},

            mixins: [Reflux.connect(Store)],

            render: function () {

                var panel;
                if (this.state.ui.mainPanel === 1) {
                    var currentUser = this.state.getCurrentUser();
                    panel = (<MainAccountPanel user={currentUser } />);
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