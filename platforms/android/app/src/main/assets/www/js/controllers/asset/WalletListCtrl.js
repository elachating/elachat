define(['app'],function(app){
  'use strict';
  app.register.controller('WalletListCtrl',[
    '$scope',
    '$rootScope',
    '$stateParams',
    '$location',
    function($scope,$rootScope,$stateParams,$location){
      //service.config($rootScope);
        $scope.jumpassetdetail =  function(){
          $location.url('/asset/wallet_main');
        }
        $scope.jumpwalletlist =  function(){
          $location.url('/asset/wallet_list');
        }
        $scope.jumpasset =  function(){
          $location.url('/asset');
        }
  }]);
});
