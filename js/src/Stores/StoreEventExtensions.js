import $ from "jquery";

import * as Constants from "../Constants";

export default {
    onAddEventForCurrentUser: function (event) {
        event.id = this.getNextEventId();
        event.UserId = this.state.currentUserId;
        this.state.events.push(event);
        this.triggerStore();
    },

    getNextEventId: function () {
        return highestEventId++;
    },

    onRemoveEventForCurrentUser: function (eventId) {
        this.state.events = this.state.events.filter(function (event) {
            return event.id !== eventId;
        });
        this.triggerStore();
    }
};