define(['app'],function(app){
  'use strict';
  app.register.service('LandingService',[
    '$q',
    '$http',
    '$rootScope',
    '$cordovaAppVersion',
    '$cordovaFileTransfer',
    '$cordovaFileOpener2',
    function($q,$http,$rootScope,$cordovaAppVersion,$cordovaFileTransfer,$cordovaFileOpener2) {
      return {
        getAppVersion: function(callback){
          $cordovaAppVersion.getVersionNumber()
            .then(function (version) {
              callback&&callback(version);
            });
        },
        getServeAppVersion: function(){
          var deferred = $q.defer();
          var rands = Math.random();
          console.log(rands);
          $http.get($rootScope.lvshapn+"version.json",{id:rands})
            .success(function (response) {
              console.log($rootScope.lvshapn+"version.json?id="+rands);
              console.log(response.version);
              //deferred.resolve(response['version']);
              deferred.resolve(response);
            });
          return deferred.promise;
        },
        apkDownload: function(apkname){
          var deferred = $q.defer();
        //  $cordovaFileTransfer.download($rootScope.lvshapn+"superwalletv101.apk", '/sdcard/Download/superwallet.apk', {}, true)
          $cordovaFileTransfer.download($rootScope.lvshapn+""+apkname, '/sdcard/Download/superwallet.apk', {}, true)
            .then(function(result) {
              deferred.resolve(result);
            }, function(err) {
              deferred.reject(err);
            }, function (progress) {
              deferred.notify(progress);
            });
          return deferred.promise;
        },
        apkOpen: function(){
          var deferred = $q.defer();
          $cordovaFileOpener2.open(
            '/sdcard/Download/superwallet.apk',
            'application/vnd.android.package-archive'
          ).then(function() {
            deferred.resolve();
          }, function(err) {
            deferred.reject(err);
          });
          return deferred.promise;
        }
      };
    }]);
});
