var GithubClient = (function(){

  var init = function() {
    console.log('passou menos')
    loadConfigs();
  },

  loadConfigs = function() {
    console.log('passou')
    $('#js-load-config').click(function(){
      let username = $('#js-load-username').val();
      $.ajax({
        type: 'GET',
        url: 'https://api.github.com/users/' + username,
        dataType: 'json',
        success: function(response) {
          console.log(JSON.stringify(response))
          hashUser = getUserInformationHash(response);
        },
        error: function(response) { $('.response').JSON.stringify(text(response)) }
      });
    })
  },

  getUserInformationHash = function(apiResponse){
    return {
      username: apiResponse['login'],
      avatar_url: apiResponse['avatar_url'],
      name: apiResponse['name'],
      company: apiResponse['company'],
      repos: apiResponse['reposUrl']
    }
  };

  return { init: init };

})();


$(document).ready(GithubClient.init);
