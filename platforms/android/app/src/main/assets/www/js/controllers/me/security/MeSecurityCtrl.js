define(['app'],function(app){
  'use strict';
  app.register.controller('MeSecurityCtrl',[
    '$scope',
    '$rootScope',
    '$stateParams',
    '$location',
    function($scope,$rootScope,$stateParams,$location){
      //service.config($rootScope);
      $scope.meindexback_security = function(){
        $location.url("/me/index");
      }
        $scope.jumpsetpin =  function(){
          $location.url('/me/security/setpin');
        }
  }]);
});
