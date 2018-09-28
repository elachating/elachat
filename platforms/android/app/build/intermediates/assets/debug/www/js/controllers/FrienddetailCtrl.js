define(['app'],function(app){
  'use strict';
  app.register.controller('FrienddetailCtrl',[
    '$scope',
    '$rootScope',
    '$location',
    '$state',
    '$stateParams',
    '$timeout',
    '$translate',
    function($scope,$rootScope,$location,$state,$stateParams,$timeout,$translate){
        $scope.jumpcontactindex = function (){
            $location.url('/friendlist');
        };
        $scope.nickname = $stateParams.nickname;
        $scope.fuid = $stateParams.fuid;
        $scope.fnickname = $stateParams.nickname;
        $scope.chat = function(){
             $state.go('chat', {fuid:$stateParams.fuid,nickname:$stateParams.nickname});
        }
  }]);
});
