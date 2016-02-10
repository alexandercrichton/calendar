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

            'logout'
        ]);

        return Actions;
    })