define(['app'],function(app){
  'use strict';
  app.register.service('WalletService',[
      '$q',
      '$rootScope',
      '$timeout',
    function($q,$rootScope,$timeout) {
          return {
                contactmessagelist: function(cointype,walletname){
                  var deferred = $q.defer();
                  webdbapi.newfriendlist(function(successful){
                    deferred.resolve(successful);
                  },function(error){
                    deferred.reject(error);
                  });
                  return deferred.promise;
                },
                nfriendlist: function(cointype,walletname){
                  var deferred = $q.defer();
                  webdbapi.newfriendlist(function(successful){
                    deferred.resolve(successful);
                  },function(error){
                    deferred.reject(error);
                  });
                  return deferred.promise;
                }
            }
    }]);
});