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
      let lang;
      if (window.localStorage.lang === undefined || window.localStorage.lang === 'undefined') {
          $scope.sites = [
                    {site : "中文", op : "cn"},
                    {site : "英文", op : "en"}
            ];
          $scope.lang= "cn";
      } else {
          lang = window.localStorage.lang;
          if(window.localStorage.lang === "en"){
              $scope.sites = [
                    {site : "Chinese", op : "cn"},
                    {site : "English", op : "en"}
                ];
          }else if(window.localStorage.lang === "cn"){
              $scope.sites = [
                    {site : "中文", op : "cn"},
                    {site : "英文", op : "en"}
                ];
          }
          $scope.lang= lang;
      }
	  $scope.meindexgeneralback = function(){
        $location.url("/me/index");
	  }
	  $scope.langchange = function(){
           window.localStorage.lang = $scope.lang;
           $translate.use(window.localStorage.lang);
           $state.reload();
	  }
  }]);
});
