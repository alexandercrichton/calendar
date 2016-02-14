define(
    [
        'react',
        "fullcalendar",
        "Actions"
    ],
    function (
        React,
        fullcalendar,
        Actions
    ) {
        var Calendar = React.createClass({

            propTypes: {
                events: React.PropTypes.array.isRequired
            },

            componentDidMount: function () {
                this.node = this.getDOMNode();
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
                        self.removeEvent(event.id);
                    },

                    events: self.props.events
                });
            },

            componentWillReceiveProps: function (newProps) {
                this.removeMissingEvents(newProps.events);
                this.renderNewEvents(newProps.events);
            },

            removeMissingEvents: function (events) {
                $(this.node).fullCalendar("removeEvents", function (renderedEvent) {

                    for (var i = 0; i < events.length; i++) {
                        if (renderedEvent.id === events[i].id) {
                            return false;
                        }
                    }

                    return true;
                });
            },

            renderNewEvents: function (events) {
                var renderedEvents = $(this.node).fullCalendar("clientEvents");

                for (var i = 0; i < events.length; i++) {
                    var isRendered = false;

                    for (var j = 0; j < renderedEvents.length; j++) {

                        if (events[i].id === renderedEvents[j].id) {
                            isRendered = true;
                            break;
                        }
                    }

                    if (!isRendered) {
                        $(this.node).fullCalendar("renderEvent", events[i], true);
                    }
                }
            },

            render: function () {
                return (
                    <div />
                );
            },

            addEvent: function (start, end) {
                var event = {
                    title: '',
                    start: start,
                    end: end
                };
                Actions.addEventForCurrentUser(event);
            },

            removeEvent: function (eventId) {
                Actions.removeEventForCurrentUser(eventId);
            }
        });

        return Calendar;
    });