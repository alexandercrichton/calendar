define(
    [
        'react',
        'jsx!React/Components/Menu/Menu',
        'jsx!React/Components/Calendar/Calendar'
    ],
    function (
        React,
        Menu,
        Calendar
    ) {
        var App = React.createClass({
            render: function () {
                return (
                    <div>
                        <Menu />
                        <Calendar />
                    </div>
                );
            }
        });

        React.render(
            <App />,
            document.getElementById('react-body'));
    });