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

            propTypes: {},

            componentDidMount: function () {
                $("#my-calendar").fullCalendar({
                    dayClick: function (date, jsEvent, view) {
                        Actions.addEventForCurrentUser(jsEvent);
                    }
                });
            },

            componentWillUpdate: function (nextProps) {

            },

            render: function () {
                return (
                    <div id="my-calendar" />
                );
            }
        });

        return Calendar;
    });