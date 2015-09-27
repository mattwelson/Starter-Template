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
    getInitialState: function(){
        return { commentMd: '' };
    },
    handleSubmit: function(e){
        e.preventDefault();
        var author = React.findDOMNode(this.refs.name).value.trim();
        var text = React.findDOMNode(this.refs.comment).value.trim();
        if (!text || !author) {
            // validate
            return;
        }
        this.props.onCommentSubmit({ author: author, text: text });
        React.findDOMNode(this.refs.name).value = '';
        React.findDOMNode(this.refs.comment).value = '';
        return;
    },
    handleChange: function(){
        this.setState({commentMd: React.findDOMNode(this.refs.comment).value});
    },
    rawMarkup: function(){
        return { __html: marked(this.state.commentMd, {sanitize: true})};
    },
    render: function () {
        return (
            <form className="comment__form" onSubmit={this.handleSubmit}>
                <div className="rows">
                    <input className="u-full-width" ref="name" type="text" placeholder="Your name" />
                </div>
                <div className="rows">
                    <textarea className="u-full-width" ref="comment" cols="20" rows="3" 
                              onChange={this.handleChange}
                              placeholder="Your thoughts"></textarea>
                </div>
                <input className="button-primary" type="submit" value="Post" />
                <div className="output" dangerouslySetInnerHTML={this.rawMarkup()}></div>
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
    handleCommentSubmit: function (comment) {
        var comments = this.state.data;
        comments.push(comment);
        this.setState({ data: comments });
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
                <CommentForm onCommentSubmit={this.handleCommentSubmit} />
            </div>
        );
    }
});

React.render(
    <CommentBox url="comments.json" pollInterval={500} />,
    document.getElementById("reactContent")
);