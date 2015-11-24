var UserStore = Reflux.createStore({
    listenables: [UserActions],
    init: function(){
        this.state = {
            userList: [1]
        };
    },
    registerUser: function () {
    },
    getCurrentUser: function () {
    },
    onTestAction: function () {
        this.state.userList.push(this.state.userList.length);
        this.trigger(this.state);
    }
});
