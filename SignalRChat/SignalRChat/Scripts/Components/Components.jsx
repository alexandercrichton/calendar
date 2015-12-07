

var App = React.createClass({
    componentDidMount: function () {
        this.unsubscribe = UserStore.listen(this.onStateChange);
        UserActions.getCurrentUser();
    },

    componentWillUnmount: function () {
        this.unsubscribe();
    },

    onStateChange: function (newState) {
        this.setState(newState);
    },

    render: function () {
        return (
            <div>
                <Menu data={this.state} />
                <Calendar />
            </div>
        );
    }
});

var Menu = React.createClass({
    propTypes: {
        data: React.PropTypes.object
    },

    render: function () {
        var currentUser = (this.props.data)
            ? this.props.data.currentUser
            : null;
        return (
            <div id="menu">
                {(function () {
                    if (currentUser) {
                        return (
                            <div>
                                <CurrentUserPanel currentUser={currentUser} />
                                <LogoutForm />
                            </div>
                        );
                    } else {
                        return (
                            <div>
                                <LoginForm />
                                <RegisterForm />
                            </div>
                        );
                    }
                })()}
            </div>
        );
    }
});

var CurrentUserPanel = React.createClass({
    propTypes: {
        currentUser: React.PropTypes.object
    },
    render: function () {
        var userName = (this.props.currentUser)
            ? this.props.currentUser.Name
            : 'empty';
        return (
            <div>
                <label>{userName}</label>
            </div>
        );
    }
});

var LoginForm = React.createClass({
    handleLogin: function (e) {
        var user = {
            Email: ReactDOM.findDOMNode(this.refs.loginEmail).value,
            Password: ReactDOM.findDOMNode(this.refs.loginPassword).value
        };
        UserActions.login(user);
    },
    render: function () {
        return (
            <div>
                <h3>Login</h3>
                <div>
                    <label >Email:</label>
                    <input ref="loginEmail" type="text" />
                    <label >Password:</label>
                    <input ref="loginPassword" type="password" />

                    <button onClick={this.handleLogin}>Login</button>
                </div>
            </div>
        );
    }
});

var RegisterForm = React.createClass({
    handleRegister: function (e) {
        var user = {
            Name: ReactDOM.findDOMNode(this.refs.registerName).value,
            Email: ReactDOM.findDOMNode(this.refs.registerEmail).value,
            Password: ReactDOM.findDOMNode(this.refs.registerPassword).value,
            Password2: ReactDOM.findDOMNode(this.refs.registerPassword2).value
        };
        UserActions.register(user);
    },
    render: function () {
        return (
            <div id="register">
                <h3>Register</h3>
                <div>
                    <label >Name:</label>
                    <input ref="registerName" type="text" />
                    <label >Email:</label>
                    <input ref="registerEmail" type="text" />
                    <label >Password:</label>
                    <input ref="registerPassword" type="password" />
                    <label >Password:</label>
                    <input ref="registerPassword2" type="password" />

                    <button onClick={this.handleRegister}>Register</button>
                </div>
            </div>
        );
    }
});

var LogoutForm = React.createClass({
    handleLogout: function (e) {
        UserActions.logout();
    },
    render: function () {
        return (
            <div>
                <button onClick={this.handleLogout}>Logout</button>
            </div>
        );
    }
});

var Calendar = React.createClass({
    render: function () {
        return (
            <div id="calendar"></div>
        );
    }
});

$(function() {
    ReactDOM.render(
        <App />,
        document.getElementById('reactTest')
    );
});
