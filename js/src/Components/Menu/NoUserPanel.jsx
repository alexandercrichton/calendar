import React from "react";

import LoginForm from "../Account/LoginForm.jsx";
import RegisterForm from "../Account/RegisterForm.jsx";

export default React.createClass({

    propTypes: {},

    render: function () {
        return (
            <div>
                <LoginForm />
                <RegisterForm />
            </div>
        );
    }
});