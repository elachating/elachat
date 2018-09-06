define(['app'],function(app){
  'use strict';
  app.register.service('SpvService',[
    '$q',
    '$rootScope',
    '$timeout',
    '$location',
    function($q,$rootScope,$timeout,$location) {
      return {
        getbalance: function(){
            var deferred = $q.defer();
            window.webspvwalletapi.subwalletlist(function(suf){
                 deferred.resolve(suf);
             },function(er){
                 deferred.reject(error);
             });
             return deferred.promise;
        },
        walletyn: function(){
            var deferred = $q.defer();
            window.webspvwalletapi.getallmasterwallet(function(success){
                 deferred.resolve(success);
             },function(er){
                 deferred.reject(error);
             });
             return deferred.promise;
        },
         walletinfo: function(wallets){
             var deferred = $q.defer();
            if(wallets=="[]"){
                 $location.url('/asset/wallet_init');
            }else{
                 window.webspvwalletapi.walletinfo(function(success){
                      deferred.resolve(success);
                  },function(er){
                      deferred.reject(error);
                  });
                  return deferred.promise;
             }
         },
         alltractionlist: function(chainid){
            var deferred = $q.defer();
            window.webspvwalletapi.alltractionlist(function(success){
                 deferred.resolve(success);
             },function(er){
                 deferred.reject(error);
             },chainid);
             return deferred.promise;
         },
      };
    }]);
});
