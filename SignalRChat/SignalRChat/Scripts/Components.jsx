var CommentBox = React.createClass({
    getInitialState: function () {
        return { data: [], title: 'Title' };
    },
    render: function () {
        return (
            <div className="commentBox">
                <h3>{this.state.title}</h3>
                <CommentList data={this.state.data} />
                <CommentForm />
            </div>
        );
    },
    componentDidMount: function () {
        var self = this;
        var emailField = $('#loginEmail').first();
        $('#loginButton').click(function () {
            self.setState({ title: emailField.val() });
        });
    }
});

var CommentList = React.createClass({
    render: function () {
        var comments = this.props.data.map(function (comment) {
            return (
                <Comment author={comment.Author}>
                    {comment.Text}
                </Comment>
            );
        });

        return (
            <div className="commentList">
                {comments}
            </div>
        );
    }
});

var Comment = React.createClass({
    render: function () {
        return (
            <div className="comment">
                <p className="commentAuthor">
                    {this.props.author}
                </p>
                {this.props.children}
            </div>
        );
    }
});

var CommentForm = React.createClass({
    render: function () {
        return (
            <div className="commentForm">
                CommentForm
            </div>
        );
    }
});

var data = [
    { Author: 'Author 1', Text: 'Text 1' },
    { Author: 'Author 2', Text: 'Text 2' },
    { Author: 'Author 3', Text: 'Text 3' }
]

React.render(
    <CommentBox data={data} />,
    document.getElementById('react')
);