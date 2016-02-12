define(
    [
        'react',
        "fullcalendar"
    ],
    function (
        React,
        fullcalendar
    ) {
        var Calendar = React.createClass({

            propTypes: {},

            componentDidMount: function () {
                $("#my-calendar").fullCalendar({});
            },

            render: function () {
                return (
                    <div id="my-calendar" />
                );
            }
        });

        return Calendar;
    });