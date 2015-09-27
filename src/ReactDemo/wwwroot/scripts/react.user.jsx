var UserName = React.createClass({
    mixins: [ParseReact.Mixin],
    observe: function () {
        return {
            user: ParseReact.currentUser
        };
    },
    render: function () {
        return (
            <span className="user__name">{this.data.user.username}</span>    
        );
    }
});

React.render(
    <UserName />,
    document.getElementById("reactUser")
);