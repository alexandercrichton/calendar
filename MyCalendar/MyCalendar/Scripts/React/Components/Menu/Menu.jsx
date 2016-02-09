define(
    [
        'react',
        'jsx!React/Components/Menu/MenuHeader',
        'jsx!React/Components/Menu/MenuBody'
    ],
    function (
        React,
        MenuHeader,
        MenuBody
    ) {
        var Menu = React.createClass({
            render: function () {
                return (
                    <div className="menu">
                        <MenuHeader />
                        <MenuBody />
                    </div>
                );
            }
        });

        return Menu;
    });