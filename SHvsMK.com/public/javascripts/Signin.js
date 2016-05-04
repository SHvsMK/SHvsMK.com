$(document).ready(function() {
  var username;
  var password;

  $('.signin_submit').click(function() {
    username = $('.username').val();
    password = $('.password').val();

    data = {
      username: username,
      password: password
    };

    $.ajax({
      method: 'POST',
      url: '/Signin',
      data: data,
      error: function(err) {
        alert(err['status']);
      },
      success: function(res) {
        alert(res.message);
        if(res.success == true) {
          localStorage.setItem('token', res.token);
          window.location.href = '/';
        } else {
          window.location.href = '/Signin';
        }
      }
    });
  });

  $('.reset').click(function() {
    $('.username').val() = "";
    $('.email').val() = "";
    $('.password').val() = "";
    $('.confirm_password').val() = "";
  });
});
