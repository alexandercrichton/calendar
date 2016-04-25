import $ from "jquery";

import * as Constants from "../Constants";

export default {
    onAddEventForCurrentUser: function (event) {
        $.post("Event/AddEvent", event)
            .done(function (addedEvent) {
                const user = this.getUserById(event.UserId);
                user.Events.push(addedEvent);
                this.triggerStore();
            }.bind(this));
    },

    onRemoveEventForCurrentUser: function (eventId) {
        const postData = {
            eventId: eventId
        };

        $.post("Event/RemoveEvent", postData);

        const user = this.getUserById(this.state.currentUserId);
        user.Events = user.Events.filter((event) => {
            return event.EventId !== eventId;
        });
        
        this.triggerStore();  
    }
};