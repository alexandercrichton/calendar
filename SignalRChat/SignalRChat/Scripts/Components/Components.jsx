
var TestComponent = React.createClass({

    getInitialState: function () {
        return {
            userList: [1]
        };
    },
    componentDidMount: function () {
            this.unsubscribe = UserStore.listen(this.onStateChange);
    },

    componentWillUnmount: function () {
            this.unsubscribe();
    },

    onStateChange: function (newState) {
        this.setState(newState);
    },

    testAction: function () {
        UserActions.testAction();
    },

    render: function() {
        // return (<p>test</p>);

        var userComponents = this.state.userList.map(function (user) {
            return (
                <TestSubComponent test={user} />
            );
        });

        return (
            <div>
                {userComponents}
                <input type="button"  value="test" onClick={this.testAction} />
            </div>
            // {this.state.userList.map(function (user) {
            //     return (<p>{user}</p>)
            // })}
        );
    }
});

var TestSubComponent = React.createClass({
    propTypes: {
        name: React.PropTypes.string
    },

    getDefaultProps: function () {
        return {
            test: 'empty'
        };
    },

    render: function () {
        return (
            <p>{this.props.test}</p>
        );
    }
});



React.render(
    <TestComponent />,
    document.getElementById('reactTest')
);




//
//
//
// var CommentBox = React.createClass({
//     getInitialState: function () {
//         return { data: [], title: 'Title' };
//     },
//     render: function () {
//         return (
//             <div className="commentBox">
//                 <h3>{this.state.title}</h3>
//                 <CommentList data={this.state.data} />
//                 <CommentForm />
//             </div>
//           );
//     },
//     componentDidMount: function () {
//         var self = this;
//         var emailField = $('#loginEmail').first();
//         $('#loginButton').click(function () {
//             self.setState({ title: emailField.val() });
//         });
//     }
// });
//
// var CommentList = React.createClass({
//     render: function () {
//         var comments = this.props.data.map(function (comment) {
//             return (
//                 <Comment author={comment.Author}>
//                     {comment.Text}
//                 </Comment>
//             );
//         });
//
//         return (
//             <div className="commentList">
//                 {comments}
//             </div>
//         );
//     }
// });
//
// var Comment = React.createClass({
//     render: function () {
//         return (
//             <div className="comment">
//                 <p className="commentAuthor">
//                     {this.props.author}
//                 </p>
//                 {this.props.children}
//             </div>
//         );
//     }
// });
//
// var CommentForm = React.createClass({
//     render: function () {
//         return (
//             <div className="commentForm">
//                 CommentForm
//             </div>
//         );
//     }
// });
//
// var test = React.createClass({
//
// })
//
// var data = [
//     { Author: 'Author 1', Text: 'Text 1' },
//     { Author: 'Author 2', Text: 'Text 2' },
//     { Author: 'Author 3', Text: 'Text 3' }
// ]
//
// React.render(
//     <CommentBox data={data} />,
//     document.getElementById('react')
// );
