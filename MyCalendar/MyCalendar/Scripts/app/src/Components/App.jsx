import React from "react";
import ReactDOM from "react-dom";

import { Menu } from "./Menu";
import MainPanel from "./Main/MainPanel.jsx";

export default React.createClass({
    render: function () {
        return (
            <div className="absolute-container">
                <Menu />
                <MainPanel />
            </div>
        );
    }
});