import React from "react";
import ReactDOM from "react-dom";
import $ from "jquery";
import "fullCalendar";

import Actions from "../../Actions/Actions";

export default React.createClass({

    propTypes: {
        currentUserId: React.PropTypes.number.isRequired,
        events: React.PropTypes.array.isRequired
    },

    fcEvents: [],

    componentWillReceiveProps: function (newProps) {
        this.setFcEvents(newProps.events)
    },

    componentDidMount: function () {
        this.node = ReactDOM.findDOMNode(this);
        var self = this;

        $(this.node).fullCalendar({

            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek'
            },

            selectable: true,

            select: function (start, end, jsEvent) {
                self.addEvent(start, end);
            },

            eventClick: function (event, jsEevnt, view) {
                if (event.userId === self.props.currentUserId) {
                    self.removeEvent(event.id);
                }
            },

            events: self.fcEvents,

            eventRender: function (event, element) {
                self.styleEvent(event, element);
            }
        });
    },

    componentDidUpdate: function (prevProps, prevState) {
        this.removeMissingEvents();
        this.renderNewEvents();
    },

    setFcEvents: function (events) {
        this.fcEvents = events.map((event) => {
            return {
                id: event.EventId,
                userId: event.UserId,
                title: event.Title,
                start: event.StartTime,
                end: event.EndTime
            };
        });
    },

    addEvent: function (start, end) {
        var event = {
            Title: '',
            UserId: this.props.currentUserId,
            StartTime: start.toISOString(),
            EndTime: end.toISOString()
        };
        Actions.addEventForCurrentUser(event);
    },

    removeEvent: function (eventId) {
        Actions.removeEventForCurrentUser(eventId);
    },

    removeMissingEvents: function () {
        const fcEvents = this.fcEvents
        $(this.node).fullCalendar("removeEvents", function (renderedEvent) {

            for (var i = 0; i < fcEvents.length; i++) {
                if (renderedEvent.id === fcEvents[i].id) {
                    return false;
                }
            }

            return true;
        });
    },

    renderNewEvents: function () {
        const renderedEvents = this.getRenderedEvents();
        const unRenderedEvents = this.filterMatchingEvents(this.fcEvents, renderedEvents);
        this.renderEvents(unRenderedEvents);
    },

    getRenderedEvents: function () {
        return $(this.node).fullCalendar("clientEvents");
    },

    filterMatchingEvents: function (sourceFcEvents, comparisonFcEvents) {
        return sourceFcEvents.filter((sourceEvent) => {
            const matches = comparisonFcEvents.filter((comparisonEvent) => {
                return sourceEvent.id === comparisonEvent.id;
            });
            return matches.length === 0;
        })
    },

    renderEvents: function (fcEvents) {
        for (let i = 0; i < fcEvents.length; i++) {
            $(this.node).fullCalendar("renderEvent", fcEvents[i], true);
        }
    },

    styleEvent: function (event, element) {
        if (event.userId === this.props.currentUserId) {
            $(element).addClass("my-event");
        }
        else {
            $(element).addClass("their-event");
        }
    },

    render: function () {
        return (
            <div />
        );
    }
});