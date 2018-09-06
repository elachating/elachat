define(['app'],function(app){
  'use strict';
  app.register.controller('WalletInitCtrl',[
    '$scope',
    '$rootScope',
    '$stateParams',
    '$location',
    function($scope,$rootScope,$stateParams,$location){
        $scope.showapp = function(){
            navigator.webtoast.showtoast("暂无应用！",1);
        }
        $scope.jumpwalletcreate =  function(){
          $location.url('/asset/wallet_create');
        }
        $scope.jumpwalletimport =  function(){
          $location.url('/asset/wallet_import');
          /*
           // window.webspvwalletapi.exportwalletpkey(function(successa){
               console.log("私钥文件内容："+successa);
           },function(errora){
               console.log("错误"+errora);
           },"2222222a","1234567a");
           */
        }
  }]);
});
