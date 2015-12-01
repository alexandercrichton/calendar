

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
        console.log(this.props.data);
        console.log(this.props.data && this.props.data.currentUser);
        var userName = (this.props.data && this.props.data.currentUser)
            ? this.props.data.currentUser.Name
            : 'empty';

        return (
            <div id="menu">
                <div>
                    <label>{userName}</label>
                </div>
                <div id="login">
                    <h3>Login</h3>
                    <div>
                        <label >Email:</label>
                        <input id="loginEmail" type="text" />
                        <label >Password:</label>
                        <input id="loginPassword" type="password" />
                        <button id="loginButton">Login</button>
                    </div>
                </div>
                <RegisterForm />
            </div>
        );
    }
});

var RegisterForm = React.createClass({

    handleRegister: function (e) {
        var user = {
            UserId: UserStore.state.currentUser.UserId,
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
