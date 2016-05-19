$(document).ready(function() {
  var username;
  var email;
  var password;
  var confirm_password;

  $('.signup_authentication').bootstrapValidator({
    message: 'This value is invalid',
    submitButtons: 'button[type="submit"]',
    live: 'enabled',
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      username: {
        message: 'Invalid username',
        validators: {
          notEmpty: {
            message: 'Username cannot be empty'
          },
          stringLength: {
            min: 6,
            max: 18,
            message: 'The length of username should be 6 between 18'
          },
          regexp: {
            regexp: /^[a-zA-Z0-9_]+$/,
            message: 'Username can only contain lower case characters, upper case characters, numbers and _'
          }
        }
      },
      email: {
        message: 'Invalid email',
        validators: {
          notEmpty: {
            message: 'Email cannot be empty'
          },
          emailAddress: {
            message: 'Email format is invalid'
          }
        }
      },
      password: {
        validators: {
          notEmpty: {
            message: 'Password cannot be empty'
          },
          identical: {
            field: 'confirm_password',
            message: 'The password and its confirm are not the same'
          },
          stringLength: {
            min: 8,
            max: 16,
            message: 'The length of password should be 8 between 16'
          }
        }
      },
      confirm_password: {
        validators: {
          notEmpty: {
            message: 'Password cannot be empty'
          },
          identical: {
            field: 'password',
            message: 'The password and its confirm are not the same'
          }
        }
      },
    }
  }).on('error.validator.bv', function(e, data) {
    data.element
      .data('bv.messages')
      .find('.help-block[data-bv-for="' + data.field + '"]').hide()
      .filter('[data-bv-validator="' + data.validator + '"]').show();
  }).on('success.form.bv', function(e) {
    e.preventDefault();
    SignupSubmit();
  });

  function SignupSubmit() {
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
  }

  $('.reset').click(function() {
    $('.username').val() = "";
    $('.email').val() = "";
    $('.password').val() = "";
    $('.confirm_password').val() = "";
  });
});
