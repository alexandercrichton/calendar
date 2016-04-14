import React from "react";
import Reflux from "reflux";

import Actions from "../../Actions/Actions";
import Store from "../../Stores/Store";

import MenuHeaderLink from "./MenuHeaderLink.jsx";
export default React.createClass({

    propTypes: {},

    mixins: [Reflux.connect(Store, "data")],

    render: function () {
        return (
            <div className="menu-header">
                <MenuHeaderLink label="Account"
                                onClick={Actions.showMenuAccountPanel }
                                isSelected={(this.state.data.ui.menuPanel === 1)} />
                <MenuHeaderLink label="People"
                                onClick={Actions.showMenuPeoplePanel }
                                isSelected={(this.state.data.ui.menuPanel === 2)} />
                <MenuHeaderLink label="Groups"
                                onClick={Actions.showMenuGroupsPanel}
                                isSelected={(this.state.data.ui.menuPanel === 3)} />
            </div>
        );
    }
});