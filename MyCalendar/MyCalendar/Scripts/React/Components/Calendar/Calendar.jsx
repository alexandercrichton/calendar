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
                this.renderCalendar(this.props);
            },

            componentWillReceiveProps: function (newProps) {
                this.renderCalendar(newProps);
            },

            renderCalendar: function (props) {
                $(this.node).fullCalendar("destroy");

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

                    events: props.events
                });
            },

            render: function () {
                return (
                    <div />
                );
            }
        });

        return Calendar;
    });