import React from "react";
import ReactDOM from "react-dom";

let App = React.createClass({
    render: function() {

        return (<p>success</p>);
    }
});

ReactDOM.render(<App />, document.getElementById("react-body"));