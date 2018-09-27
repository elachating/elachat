define(['app'],function(app){
  'use strict';
  app.register.controller('WalletInitCtrl',[
    '$scope',
    '$rootScope',
    '$stateParams',
    '$location',
    '$translate',
    function($scope,$rootScope,$stateParams,$location,$translate){
        $scope.showapp = function(){
            navigator.webtoast.showtoast("暂无应用！",1);
        }
        $scope.jumpwalletcreate =  function(){
          $location.url('/asset/wallet_create');
        }
        $scope.jumpwalletimport =  function(){
          $location.url('/asset/wallet_import');
        }
  }]);
});
