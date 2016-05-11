$(document).ready(function() {
  var username;
  var email;
  var password;
  var confirm_password;

  $('.signup_submit').click(function() {
    username = $('.username').val();
    email = $('.email').val();
    password = $('.password').val();
    confirm_password = $('.confirm_password').val();

    data = {
      username: username,
      email: email,
      password: password,
      confirm_password: confirm_password
    };

    $.ajax({
      method: 'POST',
      url: '/Signup',
      data: data,
      error: function(err) {
        alert(err['status']);
      },
      success: function(res) {
        alert(res.message);
        if(res.success == true) {
          window.localStorage.setItem('token', res.token);
          window.location.href = '/Signin';
        } else {
          window.location.href = '/Signup';
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
