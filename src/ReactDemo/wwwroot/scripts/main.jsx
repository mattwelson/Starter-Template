var ListItem = React.createClass({
    mixins: [ParseReact.Mixin],
    observe: function(){
        return {
            items: new Parse.Query("Item").equalTo("list", this.props.list)
        }
    },
    render: function () {
        return (
            <li>
                <h3>{this.props.list.name}</h3>
                <ul className="item__list">
                    { this.data.items.map(function(item){
                        return <li key={item.id}>{item.name}</li>
                    }, this)}
                </ul>
            </li>
        );
    }
});

var ListView = React.createClass({
    mixins: [ParseReact.Mixin],
    observe: function () {
        return {
            lists: Parse.User.current().relation('lists').query()
        };
    },
    render: function () {
        return (
            <div className={this.pendingQueries().length ? 'list--loading list' : 'list'}>
                <ul className="list--list">
                    {this.data.lists.map(function(list){
                        return <ListItem key={list.id} list={list} />
                    }, this)}
                </ul>
            </div>
        );
    }
});

React.render(
    <ListView />,
    document.getElementById("reactContent")
);