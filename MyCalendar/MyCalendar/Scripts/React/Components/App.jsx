define(
    [
        'react',
        'jsx!React/Components/Menu/Menu',
        'jsx!React/Components/Main/MainPanel'
    ],
    function (
        React,
        Menu,
        MainPanel
    ) {
        var App = React.createClass({
            render: function () {
                return (
                    <div>
                        <Menu />
                        <MainPanel />
                    </div>
                );
            }
        });

        React.render(
            <App />,
            document.getElementById('react-body'));
    });