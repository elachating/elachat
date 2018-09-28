define(['app'],function(app){
  'use strict';
  app.register.controller('MeSupportCtrl',[
    '$scope',
    '$rootScope',
    '$stateParams',
    '$location',
    '$http',
    '$translate',
    function($scope,$rootScope,$stateParams,$location,$http,$translate){
           $scope.meindexback_support = function(){
                $location.url("/me/index");
           }
  }]);
});
