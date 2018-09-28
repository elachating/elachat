define(['app'],function(app){
  'use strict';
  app.register.controller('MeHelpDetailCtrl',[
    '$scope',
    '$rootScope',
    '$stateParams',
    '$location',
    '$http',
    function($scope,$rootScope,$stateParams,$location,$http){
	$scope.noticeback = function(){
        $location.url("/me/helpCenter");
	}
        $http({
            method: 'GET',
            url: 'http://121.42.196.42:91/public/index.php/me/news/detail?id='+$location.search().id
        }).then(function successCallback(response) {
            if(response.data.code == "1"){
                $scope.data = response.data.msg;
            }else{
                console.log(response.data.msg)
            }
        }, function errorCallback(response) {
                console.log(response)
        });
  }]);
});
