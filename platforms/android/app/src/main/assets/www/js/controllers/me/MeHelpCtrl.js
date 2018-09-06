define(['app'],function(app){
  'use strict';
  app.register.controller('MeHelpCtrl',[
    '$scope',
    '$rootScope',
    '$stateParams',
    '$location',
    '$http',
    function($scope,$rootScope,$stateParams,$location,$http){
        $scope.meindexback_help =  function(){
          $location.url('/me/index');
        }
        $http({
            method: 'GET',
            url: 'http://121.42.196.42:91/public/index.php/me/news/index?cate=2'
        }).then(function successCallback(response) {
            if(response.data.code == "1"){
                $scope.data = response.data.msg;
            }else{
                 console.log(response.data.msg)
            }
        }, function errorCallback(response) {
                console.log(response)
        });

        $scope.jumpdetail = function(id){
             $location.url('/me/news_detail?id='+id);
        }
  }]);
});
