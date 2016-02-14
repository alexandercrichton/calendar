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

                $(this.node).fullCalendar({

                    header: {
                        left: 'prev,next today',
                        center: 'title',
                        right: 'month,agendaWeek'
                    },

                    selectable: true,

                    select: function (start, end, jsEvent) {
                        var event = {
                            title: '',
                            start: start,
                            end: end
                        };
                        Actions.addEventForCurrentUser(event);
                    },

                    eventSources: [this.props.events]
                });
            },

            componentWillReceiveProps: function (newProps) {
                this.renderUnrenderedEvents(newProps.events);

                //for (var i = 0; i < newProps.events.length; i++) {
                //    var event = newProps.event[i];
                //    if (!eventTracker.isEventRendered(event)) {
                //        $(this.node).fullCalendar("renderEvent", event, true);
                //        eventTracker.addRenderedEvent(event);
                //    }
                //}
            },

            render: function () {
                return (
                    <div />
                );
            },

            renderUnrenderedEvents: function (events) {
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
            }
        });

        return Calendar;
    });