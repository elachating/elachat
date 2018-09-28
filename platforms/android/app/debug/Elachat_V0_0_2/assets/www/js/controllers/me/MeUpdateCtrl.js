define(['app'],function(app){
  'use strict';
  app.register.controller('MeUpdateCtrl',[
    '$scope',
    '$rootScope',
    '$stateParams',
    '$location',
    '$http',
    '$translate',
    function($scope,$rootScope,$stateParams,$location,$http,$translate){
        $scope.meindexback_update =  function(){
          $location.url('/me/index');
        }
        $http({
                method: 'GET',
                url: 'https://ela.chat/version/up.json'
            }).then(function successCallback(response) {
                if(AppVersion.build!=response.data){
                       $scope.upred = true;
                }
            }, function errorCallback(response) {
                console.log(response)
            });
        $scope.checknew = function(){
             window.AppUpdate.checkAppUpdate(function(r){
                if(r.msg=="success, up to date."){
			        navigator.webtoast.showtoast("已经是最新版本！",1);
                }
             }, function(e){console.log("这是E："+e)}, "https://ela.chat/version/v.xml");
        }
  }]);
});