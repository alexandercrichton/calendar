define(
    [
        'reflux'
    ],
    function (
        Reflux
    ) {
        var Actions = Reflux.createActions([

            'register',
            'login',
            'logout',

            "setMenuPanel",
            "showMenuAccountPanel",
            "showMenuPeoplePanel",
            "showMenuGroupsPanel",

            "setMainPanel",

            "saveUserDetails",

            "viewPerson"
        ]);

        return Actions;
    })