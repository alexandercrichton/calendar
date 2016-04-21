import Reflux from "reflux";

export default Reflux.createActions([
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
    "linkCurrentUserToUserByEmail",
    "removeLinkForPerson",

    "addEventForCurrentUser",
    "removeEventForCurrentUser"
]);
