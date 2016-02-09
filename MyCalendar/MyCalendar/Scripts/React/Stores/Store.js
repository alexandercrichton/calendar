define([
    'reflux',
    'Actions'
],
    function (
        Reflux,
        Actions
    ) {
        var Store = Reflux.createStore({
            listenables: [Actions],

            init: function () {
                this.state = {
                    currentMenuSelection: 1,
                    currentUser: {
                        id: 1,
                        name: 'current user'
                    },
                    people: [
                        {
                            id: 1,
                            name: 'person 1'
                        }
                    ],
                    groups: [
                        {
                            id: 1,
                            name: 'group 1'
                        }
                    ]
                };
            },

            getInitialState: function () {
                return this.state;
            },

            onSetMenuSection: function (section) {
                this.state.currentMenuSelection = section;
                this.triggerStore();
            },

            onLogout: function () {
                this.state.currentUser = null;
                this.triggerStore();
            },

            triggerStore: function () {
                this.trigger(this.state);
            }
        });

        return Store;
    });