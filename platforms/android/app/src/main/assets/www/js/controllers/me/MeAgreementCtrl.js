define(['app'],function(app){
  'use strict';
  app.register.controller('MeAgreementCtrl',[
    '$scope',
    '$rootScope',
    '$stateParams',
    '$location',
    function($scope,$rootScope,$stateParams,$location){
           $scope.meindexback_agree = function(){
                $location.url("/me/index");
           }
  }]);
});
