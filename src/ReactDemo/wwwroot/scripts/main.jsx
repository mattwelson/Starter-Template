// following tutorial from http://facebook.github.io/react/docs/tutorial.html

var Comment = React.createClass({
    rawMarkup: function () {
        var rawMarkup = marked(this.props.children.toString(), { sanitize: true });
        return { __html: rawMarkup };
    },
    render: function () {
        return (
            <div className="comment__comment">
                <h4 className="comment__author">
                    { this.props.author }
                </h4>
                <div className="comment__body" dangerouslySetInnerHTML={this.rawMarkup()}>
                </div>
            </div>
        );
    }
});

var CommentList = React.createClass({
    render: function () {
        var commentNodes = this.props.data.map(function (comment) {
            return (
                <Comment author={ comment.author }>
                    { comment.text }
                </Comment>
            );
        });
        return (
                <div className="comment__list">
                    { commentNodes }
                </div>
            );
    }
});

var CommentForm = React.createClass({
    render: function () {
        return (
            <form className="comment__form">
                <div class="rows">
                    <input className="u-full-width" ref="name" type="text" placeholder="Your name" />
                </div>
                <div class="rows">
                    <textarea className="u-full-width" ref="comment" cols="20" rows="3" placeholder="Your thoughts"></textarea>
                </div>
                <input className="button-primary" type="submit" value="Post" />
            </form>
        );
    }
});

var CommentBox = React.createClass({
    loadCommentsFromServer: function () {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({ data: data });
            }.bind(this),
            error: function (xhr, status, err) {
                console.log(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    getInitialState: function () {
        return { data: [] };
    },
    componentDidMount: function () {
        this.loadCommentsFromServer();
        //setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    },
    render: function () {
        return (
            <div className="comment">
                <h3>Comments</h3>
                <CommentList data={ this.state.data } />
                <CommentForm />
            </div>
        );
    }
});

React.render(
    <CommentBox url="comments.json" pollInterval={500} />,
    document.getElementById("reactContent")
);