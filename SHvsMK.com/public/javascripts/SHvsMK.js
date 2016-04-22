var app = angular.module("SHvsMK", ['ngAnimate']);

app.controller('SHvsMKCtrl', function($scope){
  $scope.how_list = false;
  $scope.how = function() {
    $scope.how_list = !$scope.how_list;
  }

});

$(document).ready(function(){
  $('.SHvsMK_icon').hover(function(){
    $('.SHvsMK_icon_img').css('opacity', 1);
  });
  $('.SHvsMK_icon').mouseout(function(){
    $('.SHvsMK_icon_img').css('opacity', 0.7);
  });
});
