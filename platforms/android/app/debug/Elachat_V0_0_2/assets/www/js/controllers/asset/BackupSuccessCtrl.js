define(['app'],function(app){
  'use strict';
      app.register.controller('BackupSuccessCtrl',[
    '$scope',
    '$rootScope',
    '$stateParams',
    '$location',
    function($scope,$rootScope,$stateParams,$location){
      //service.config($rootScope);
        $scope.jumpindex =  function(){
          $location.url('/asset');
        }

  }]);
});
