define(['app'],function(app){
  'use strict';
  app.register.controller('NewfriendlistCtrl',[
    '$scope',
    '$rootScope',
    '$location',
    '$timeout',
    '$state',
    '$translate',
    function($scope,$rootScope,$location,$timeout,$state,$translate){
        $scope.jumpcontactindex = function (){
             $location.url('/index');
        };
        $scope.jumpfriendlist = function (){
             $location.url('/friendlist');
        };
        $scope.acceptbtn = function(uid){
            window.webcarrierapi.acceptfriend(function(successful){
                 window.webdbapi.updatefriend(function(successfuls){
                    navigator.webtoast.showtoast($translate.instant("newfriendlist_accept_successful_tip"),1);
                    $state.reload('app.newfriendlist');
                 },function(errors){
                         //error;
                 },uid)
            },function(error){
                navigator.webtoast.showtoast($translate.instant("newfriendlist_accept_error_tip"),1);
            },uid);
        };
		window.webdbapi.newfriendlist(function(successful){
		    $scope.nfriendlist =eval('(' + successful + ')');
		},function(error){
			navigator.webtoast.showtoast($translate.instant("newfriendlist_getdata_error_tip"),1);
		});
  }]);
});
