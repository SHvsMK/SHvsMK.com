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
      alert(res.message);
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
    // ack = JSON.stringify({'sender':});
    // socket.send()
    alert("yes");
    alert(socket.readyState);
  }

  socket.onmessage = function(msg) {
    // display = 'div';
    m = JSON.parse(msg.data);
    sender = m.Sender;
    content = m.Message;
    if (sender == user) {
      alert("same");
    } else {
      alert("no");
    }
    // alert(msg.sender);
    // alert(msg.isTrusted);
    // alert(msg.data);
    // alert(JSON.parse(msg));
    // alert(msg.textMessage);
    // $(".Message-receive").html('<h1>'+msg.data+'</h1>');
  }

  $('.send').click(function() {
    message = $('.message').val();
    if (message == "")
      return;
    data = JSON.stringify({'sender': user, 'message': message});
    alert(data);
    socket.send(data);
  });
  // $('.try').click(function() {
  //   $.ajax({
  //       url: "http://localhost:8080/",
  //       method: "GET",
  //       success: function(data){
  //         var key = Object.keys(data);
  //         alert(key);
  //         alert(data['hello']);
  //       },
  //       error: function(err){
  //         alert("no");
  //       }
  //     });
  // });
});
