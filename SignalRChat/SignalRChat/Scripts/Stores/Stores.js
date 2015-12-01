var UserStore = Reflux.createStore({

    self: {},

    listenables: [UserActions],

    init: function(){
        self = this;
        this.state = {
            currentUser: {}
        };
    },

    onGetCurrentUser: function () {
        core.http.get('User/Current',
            function (data) {
                self.state.currentUser = data;
                self.trigger(self.state);
            },
            function (jqXHR, textStatus, errorThrown) {
                console.log(textStatus);
                console.log(errorThrown);
            });
    },

    onRegister: function (user) {
        if (user) {
            core.http.post('User/Register',
                user,
                function (data) {
                    self.state.currentUser = data;
                    self.trigger(self.state);
                },
                function (jqXHR, textStatus, errorThrown) {
                    console.log(textStatus);
                    console.log(errorThrown);
                });
        }
    }
});
