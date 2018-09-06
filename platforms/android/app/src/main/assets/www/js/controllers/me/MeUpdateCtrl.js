define(['app'],function(app){
  'use strict';
  app.register.controller('MeUpdateCtrl',[
    '$scope',
    '$rootScope',
    '$stateParams',
    '$location',
    function($scope,$rootScope,$stateParams,$location){
        $scope.meindexback_update =  function(){
          $location.url('/me/index');
        }
  }]);
});
