define(['app'],function(app){
  'use strict';
  app.register.controller('WalletphraseCtrl',[
    '$scope',
    '$rootScope',
    '$stateParams',
    '$location',
    function($scope,$rootScope,$stateParams,$location){
        window.localStorage.removeItem("mnemonicone");
        window.webspvwalletapi.creatememwords(function(success){
            window.localStorage.mnemonicone = success;
            $scope.words = success;
        },function(error){
            console.log("错误"+error);
        });
        $scope.jumpwalletphrasenext =  function(){
          $location.url('/asset/walletphrase_next');
        }
  }]);
});
