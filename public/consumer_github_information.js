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
           document.getElementById('example'))
         }
         id="js-load-config"> Carregar configs </button>
      </div>
    )
  }
});

var UserBox = React.createClass({
  getInitialState : function() {
    return {
      username: ''
    }
  },

  componentDidMount : function() {
    this.serverRequest = $.get(this.props.url, function (result) {
      this.setState(this.getUserInformationHash(result));
    }.bind(this));
  },

  componentWillUnmount: function() {
    this.serverRequest.abort();
  },

  getUserInformationHash : function(apiResponse){
    return {
      username: apiResponse['login'],
      avatar_url: apiResponse['avatar_url'],
      name: apiResponse['name'],
      company: apiResponse['company'],
      repos: apiResponse['reposUrl']
    }
  },

  render : function() {
    console.log(this.state)
    return (
      <div className="userBox row">
        <UserName username={this.state.username} />
      </div>
    );
  }
});

var UserName = React.createClass({
  getInitialState : function() {
    console.log(this)
    return ({
      username: '',
      avatar: ''
    })
  },

  render : function() {
    return (
      <div>
        <div className="userName col-xs-6">
          {this.props.username}
        </div>
        <div className="user-avatar col-xs-6">
             'teste'
        </div>
      </div>
    );
  }
})

ReactDOM.render(
  <Buttons />, document.getElementById('example')
);
