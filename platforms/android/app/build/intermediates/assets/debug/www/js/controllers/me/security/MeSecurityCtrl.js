define(['app'],function(app){
  'use strict';
  app.register.controller('MeSecurityCtrl',[
    '$scope',
    '$rootScope',
    '$stateParams',
    '$location',
    '$translate',
    function($scope,$rootScope,$stateParams,$location,$translate){
      $scope.meindexback_security = function(){
        $location.url("/me/index");
      }
        $scope.jumpsetpin =  function(){
          $location.url('/me/security/setpin');
        }
  }]);
});
