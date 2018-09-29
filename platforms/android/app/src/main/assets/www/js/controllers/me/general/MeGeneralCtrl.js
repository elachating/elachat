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
                    {site : "Chinese", op : "cn"},
                    {site : "English", op : "en"}
            ];
          $scope.lang= "en";
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
        if(localStorage.nowys==1){
            $("#switch_1").click();
        }
	  $scope.mvset = function(){
		if(localStorage.nowys==1){
			localStorage.nowys = 0;
			window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
                 window.resolveLocalFileSystemURL(cordova.file.applicationStorageDirectory, function (dirEntry) {
                   dirEntry.getFile("voice.txt", {create: true, exclusive: false}, function(fileEntry) {
                          var dataObj = new Blob(["0"], {type: 'text/plain'});
                            fileEntry.createWriter(function (fileWriter) {
                                fileWriter.onwriteend = function () {
                                console.log("Successful file write...");
                                };
                                fileWriter.onerror = function (e) {
                                console.log("Failed file write: " + e.toString());
                                };
                                fileWriter.write(dataObj);
                             });

                           }, function(ee){console.log("error")});
                    }, function(ea){console.log("error")});
            },  function(ee){console.log("error")});
		}else{
			console.log("被点击2");
			localStorage.nowys = 1;
			window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
                 window.resolveLocalFileSystemURL(cordova.file.applicationStorageDirectory, function (dirEntry) {
                   dirEntry.getFile("voice.txt", {create: true, exclusive: false}, function(fileEntry) {
                          var dataObj = new Blob(["1"], {type: 'text/plain'});
                            fileEntry.createWriter(function (fileWriter) {
                                fileWriter.onwriteend = function () {
                                console.log("Successful file write...");
                                };
                                fileWriter.onerror = function (e) {
                                console.log("Failed file write: " + e.toString());
                                };
                                fileWriter.write(dataObj);
                             });

                           }, function(ee){console.log("error")});
                    }, function(ea){console.log("error")});
            },  function(ee){console.log("error")});
		}
	  }
	  $scope.langchange = function(){
           window.localStorage.lang = $scope.lang;
           $translate.use(window.localStorage.lang);
           $state.reload();
	  }
  }]);
});
