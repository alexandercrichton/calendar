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

            "viewPerson",
            "saveUserDetails",
            "addLinkToSelectedEmail",
            "removeLinkForPerson",

            "addEventForCurrentUser",
            "removeEventForCurrentUser"

        ]);

        return Actions;
    })