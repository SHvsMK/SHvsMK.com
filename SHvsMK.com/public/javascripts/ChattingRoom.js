$(document).ready(function() {

  var message = "";
  var user = "";
  var token = window.localStorage.getItem('token');

  if (token) {
    $.ajaxSetup({
      async: false
    });
  }

  data = {
    token: token
  };

  $.ajax({
    method: 'POST',
    url: '/ChattingRoom',
    data: data,
    error: function(err) {
      alert(err);
    },
    success: function(res) {
      if (res.success == false) {
        window.location.href = '/Signin';
      } else {
        user = res.username;
        $('.profile-name').html('<h3>' + res.username + '<h3>');
      }
    }
  });

  var socket = new WebSocket("ws://10.105.76.129:8080?username=" + user);
  socket.onopen = function() {
  }

  socket.onmessage = function(msg) {
    m = JSON.parse(msg.data);
    sender = m.Sender;
    content = m.Message;
    if (sender == user) {
      $('.chat-thread').append('<li class="my_message">' + content + '</li>');
    } else {
      $('.chat-thread').append('<li class="friends_message">' + content + '</li>');
    }
  }

  $('.send').click(function() {
    message = $('.message').val();
    if (message == "")
      return;
    data = JSON.stringify({'sender': user, 'message': message});
    socket.send(data);
  });
});
