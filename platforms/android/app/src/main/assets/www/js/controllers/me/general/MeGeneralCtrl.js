define(['app'],function(app){
  'use strict';
  app.register.controller('MeGeneralCtrl',[
    '$scope',
    '$rootScope',
    '$stateParams',
    '$location',
    '$state',
    '$translate',
    function($scope,$rootScope,$stateParams,$location,$state,$translate){
      $scope.sites = [
      	    {site : "中文", op : "cn"},
      	    {site : "英文", op : "en"}
      	];
      if( window.localStorage.lang=="en"){
         $scope.lang="choose";
      }else{
         $scope.lang="请选择";
      }
	  $scope.meindexgeneralback = function(){
        $location.url("/me/index");
	  }
	  $scope.langchange = function(){
           window.localStorage.lang = $scope.lang;
           $translate.use(window.localStorage.lang);
           $state.reload();
           //$state.go("index",{},{reload: true});
           //$state.go("index",{},{reload：true});
	  }
  }]);
});
