define(['app'],function(app){
  'use strict';
  app.register.controller('MeSupportCtrl',[
    '$scope',
    '$rootScope',
    '$stateParams',
    '$location',
    '$http',
    function($scope,$rootScope,$stateParams,$location,$http){
           $scope.meindexback_support = function(){
                $location.url("/me/index");
           }
  }]);
});
