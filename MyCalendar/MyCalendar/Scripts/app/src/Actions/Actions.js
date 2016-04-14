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
    "addLinkToSelectedEmail",
    "removeLinkForPerson",

    "addEventForCurrentUser",
    "removeEventForCurrentUser"
]);
