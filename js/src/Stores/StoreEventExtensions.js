import $ from "jquery";

import * as Constants from "../Constants";

export default {
    onAddEventForCurrentUser: function (event) {
        const postData = {
            UserId: this.state.currentUserId,
            Title: event.title,
            StartTime: event.start,
            EndTime: event.EndTime
        };

        $.post("Event/AddEvent", postData)
            .done(function (addedEvent) {
                this.state.events.push(addedEvent);
                console.log(addedEvent);
                this.triggerStore();
            });
    },

    onRemoveEventForCurrentUser: function (eventId) {
        this.state.events = this.state.events.filter(function (event) {
            return event.id !== eventId;
        });
        this.triggerStore();
    }
};