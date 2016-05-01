$(document).ready(function() {

  var socket = new WebSocket("ws://10.105.160.77:8080/");
  var message = "";
  var user = "";

  socket.onopen = function() {
    // ack = JSON.stringify({'sender':});
    // socket.send()
    // alert("yes");
    // alert(socket.readyState);
  }

  socket.onmessage = function(msg) {
    $(".Receive").val(msg.data);
  }

  $('.send').click(function() {
    message = $('.Message').val();
    user = $('.User').val();
    if (message == "" || user == "")
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
