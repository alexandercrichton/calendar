import React from "react";
import MenuHeader from "./MenuHeader.jsx";
import MenuBody from "./MenuBody.jsx";

export default React.createClass({
    render: function () {
        return (
            <div className="menu">
                <MenuHeader />
                <MenuBody />
            </div>
        );
    }
});