$(document).ready(function() {

  var token;

  if (token) {
    $.ajaxSetup({
      headers: {
        'x-access-token': token
      }
    });
  }

  $('.Code').click(function() {
    window.location.href = '/Blog/Code';
  });

  $('.Food').click(function() {
    window.location.href = '/Blog/Food';
  });

  $('.Travel').click(function() {
    window.location.href = '/Blog/Travel';
  });

  $('.Photo').click(function() {
    window.location.href = '/Blog/Photo';
  });

  $('.chatting_room_door').click(function() {
    token = window.localStorage.getItem('token');
    if (token) {
      window.location.href = '/ChattingRoom' + '?token=' + token;
    } else {
      window.location.href = '/ChattingRoom';
    }

  });

  $('.Code').hover(function() {
    $('.Code').css('animation-play-state', 'paused');
  });

  $('.Code').mouseout(function() {
    $('.Code').css('animation-play-state', 'running');
  });

  $('.Food').hover(function() {
    $('.Food').css('animation-play-state', 'paused');
  });

  $('.Food').mouseout(function() {
    $('.Food').css('animation-play-state', 'running');
  });

  $('.Travel').hover(function() {
    $('.Travel').css('animation-play-state', 'paused');
  });

  $('.Travel').mouseout(function() {
    $('.Travel').css('animation-play-state', 'running');
  });

  $('.Photo').hover(function() {
    $('.Photo').css('animation-play-state', 'paused');
  });

  $('.Photo').mouseout(function() {
    $('.Photo').css('animation-play-state', 'running');
  });

  $('.chatting_room_door').hover(function() {
    $('.chat_room').html("JOIN");
    $('.chat_room').css('font-style', 'italic');
    $('.chat_room').css('font-family', 'sans-serif');
    $('.chat_room').css('margin-left', '50px');
    $('.chat_room').css('margin-top', '20px');
  });

  var height = 0;
  var width = 0;
  var increase = 0.01;
  var code_opacity = 0;
  var food_opacity = 0;
  var travel_opacity = 0;
  var photo_opacity = 0;
  var code_bubble;
  var food_bubble;
  var travel_bubble;
  var photo_bubble;

  bubble_appear();

  function bubble_appear() {
    setTimeout(code_appear, 1000);
    setTimeout(food_appear, 2000);
    setTimeout(travel_appear, 3000);
    setTimeout(photo_appear, 4000);
  }

  function code_appear() {
    code_bubble = setInterval(bubble_showup_Code, 100);
  }

  function food_appear() {
    food_bubble = setInterval(bubble_showup_Food, 100);
  }

  function travel_appear() {
    travel_bubble = setInterval(bubble_showup_Travel, 100);
  }

  function photo_appear() {
    photo_bubble = setInterval(bubble_showup_Photo, 100);
  }

  function bubble_showup_Code() {
    code_opacity += increase;
    $('.Code').css('opacity', code_opacity);
    if (code_opacity >= 0.7) {
      clearInterval(code_bubble);
    }
  }

  function bubble_showup_Food() {
    food_opacity += increase;
    $('.Food').css('opacity', food_opacity);
    if (food_opacity >= 0.7)
      clearInterval(food_bubble);
  }

  function bubble_showup_Travel() {
    travel_opacity += increase;
    $('.Travel').css('opacity', travel_opacity);
    if (travel_opacity >= 0.7)
      clearInterval(travel_bubble);
  }

  function bubble_showup_Photo() {
    photo_opacity += increase;
    $('.Photo').css('opacity', photo_opacity);
    if (photo_opacity >= 0.7)
      clearInterval(photo_bubble);
  }
});
