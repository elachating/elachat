define(['app'],function(app){
  'use strict';
  app.register.service('ChatService',[
    '$q',
    '$rootScope',
    '$timeout',
    function($q,$rootScope,$timeout) {
      return {
        chatmessage: function(fuid){
             var deferred = $q.defer();
            window.webdbapi.nnchatlist(function(suf){
                 var dataobj=eval('(' + suf + ')');
                 deferred.resolve(dataobj);
             },function(er){
                 deferred.reject(error);
             },fuid);
             return deferred.promise;
        },
        getwalletadr:function(){
             var deferred = $q.defer();

            window.webspvwalletapi.addresslist(function(successa){
               deferred.resolve(eval('(' + successa + ')').Addresses[0]);
            },function(errora){
                 deferred.reject(errora);
            },$stateParams.chainidb);
             return deferred.promise;
        },
        getwalletadr:function(){
             var deferred = $q.defer();
            window.webspvwalletapi.addresslist(function(successa){
               deferred.resolve(eval('(' + successa + ')').Addresses[0]);
            },function(errora){
                 deferred.reject(errora);
            },"ELA");
             return deferred.promise;
        },
        sendwalletadr:function(fuid,walletadr){
              var deferred = $q.defer();
              var message = '<button style="width:80px;height:30px;" attr="'+walletadr+'" class="sendwalletadr">转账交易</button>';
              window.webcarrierapi.sendmessage(function(suf){
                 deferred.resolve(eval('(' + successa + ')').Addresses[0]);
              },function(errora){
                   deferred.reject(errora);
              },fuid,message);
               return deferred.promise;
          },
      };
    }]);
});
