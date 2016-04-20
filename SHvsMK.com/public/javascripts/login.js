var app = angular.module("index", []);

app.controller('indexCtrl', function($scope, $http){
  $scope.Submit = "Submit";
  $scope.triger = function() {
    data = {username: $scope.username, password: $scope.password};
    data = JSON.stringify(data);
    $http({
      method: 'POST',
      url: '/',
      data: data
    }).then(function success(res){
      // alert(res);
    }, function error(er){
      alert(er['status']);
    });
  };
});
