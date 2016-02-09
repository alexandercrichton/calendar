define(
    [
        'reflux'
    ],
    function (
        Reflux
    ) {
        var Actions = Reflux.createActions([
            "setMenuSection",
            'logout'
        ]);

        return Actions;
    })