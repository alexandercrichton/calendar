define(
    [
        'reflux'
    ],
    function (
        Reflux
    ) {
        var Actions = Reflux.createActions([

            "setMenuSection",

            'register',

            'login',

            'logout',

            "editUser"
        ]);

        return Actions;
    })