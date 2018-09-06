define(['app'],function(app){
  'use strict';
  app.register.controller('CreatedSuccessCtrl',[
    '$scope',
    '$rootScope',
    '$stateParams',
    '$location',
    function($scope,$rootScope,$stateParams,$location){
      //service.config($rootScope);

       $scope.jumpwalletbackup =  function(){
            $location.url('/asset/wallet_backup');
          }

  }]);
});
