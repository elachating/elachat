define(['app'],function(app){
  'use strict';
  app.register.controller('MeCtrl',[
    '$scope',
    '$rootScope',
    '$stateParams',
    '$location',
    '$http',
    '$translate',
    function($scope,$rootScope,$stateParams,$location,$http,$translate){
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
        $scope.jumpwallet =  function(){

          if (window.localStorage.walletyn === undefined || window.localStorage.walletyn === 'undefined') {
               navigator.webtoast.showtoast($translate.instant("me_wallet_index_wallet_manage"),1);
          }else{
               $location.url('/me/wallet/index');
          }
        }
        $scope.jumpsecurity =  function(){
          $location.url('/me/security/index');
        }
        $scope.jumpgeneral  =  function(){
          $location.url('/me/general/index');
        }
        $scope.jumpnews =  function(){
          $location.url('/me/news');
        }
        $scope.jumphelpcenter =  function(){
          $location.url('/me/helpCenter');
        }
        $scope.jumpfeedback =  function(){
          $location.url('/me/feedback');
        }
        $scope.jumpupdate =  function(){
          $location.url('/me/update');
        }
        $scope.jumpagreement =  function(){
          $location.url('/me/agreement');
        }
        $scope.jumpsupport =  function(){
          $location.url('/me/support');
        }
        $scope.showapp = function(){
            navigator.webtoast.showtoast("暂无应用！",1);
        }
  }]);
});
