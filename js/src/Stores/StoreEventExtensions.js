import $ from "jquery";

import * as Constants from "../Constants";

export default {
    onAddEventForCurrentUser: function (event) {
        $.post("Event/AddEvent", event)
            .done(function (addedEvent) {
                this.state.events.push(addedEvent);
                this.triggerStore();
            }.bind(this));
    },

    onRemoveEventForCurrentUser: function (eventId) {
        const postData = {
            eventId: eventId
        };

        $.post("Event/RemoveEvent", postData);

        this.state.events = this.state.events.filter((event) => {
            return event.EventId !== eventId;
        });
        this.triggerStore();  
    }
};