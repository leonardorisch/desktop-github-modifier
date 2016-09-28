function loadConfigs() {
  $('#js-load-config').click(function(){
    let username = $('#js-load-username').val();
    $.ajax({
      type: 'GET',
      url: 'https://api.github.com/users/' + username,
      dataType: 'json',
      success: function(response) { $('.response').text(JSON.stringify(response)) },
      error: function(response) { $('.response').JSON.stringify(text(response)) }
    });
  })
}


$(document).ready(loadConfigs); 
