import React from 'react';
import ReactDOM from 'react-dom';

var Buttons = React.createClass({


  handleChange : function(event) {
    this.setState({'username': event.target.value});
  },

  render : function() {
    return(
      <div>
        <input type="text" name="username" onChange={this.handleChange} id="js-load-username"/>
        <button className="btn btn-danger"
          onClick={() => ReactDOM.render(<UserBox url={"https://api.github.com/users/"+ this.state.username} />,
        document.getElementById('content'))
         }
         id="js-load-config"> Carregar configs </button>
      </div>
    )
  }
}),

UserBox = React.createClass({
  getInitialState : function() {
    return {
      username: ''
    }
  },

  componentDidMount : function() {
    this.serverRequest = $.get(this.props.url, function (result) {
      this.setState(result);
    }.bind(this));
  },

  componentWillUnmount: function() {
    this.serverRequest.abort();
  },

  render : function() {
    return (
      <div className="userBox">
        <UserInformation apiResponse={this.state} />
      </div>
    );
  }
}),

UserInformation = React.createClass({
  render : function() {
    console.log(this.props.apiResponse)
    return (
      <div className="row center">
        <UserName username={this.props.apiResponse.login}/>
        <UserAvatar avatar={this.props.apiResponse.avatar_url}/>
      </div>
    );
  }
}),

UserName = React.createClass({
  render : function(){
    return(
      <div className="user-name col-xs-6">
        {this.props.username}
      </div>
    )
  }
}),

UserAvatar = React.createClass({
  render : function(){
    return(
      <div className="user-avatar col-xs-6">
        <a href="#" className="thumbnail">
          <img src={this.props.avatar} className="avatar"/>
        </a>
      </div>
    )
  }
})

ReactDOM.render(
  <Buttons />, document.getElementById('content')
);
