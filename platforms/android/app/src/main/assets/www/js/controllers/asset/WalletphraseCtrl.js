define(['app'],function(app){
  'use strict';
  app.register.controller('WalletphraseCtrl',[
    '$scope',
    '$rootScope',
    '$stateParams',
    '$location',
    '$translate',
    function($scope,$rootScope,$stateParams,$location,$translate){
        window.localStorage.removeItem("mnemonicone");
        window.webspvwalletapi.creatememwords(function(success){
            window.localStorage.mnemonicone = success;
            $scope.words = success;
        },function(error){
            console.log("错误"+error);
        },'english');
        $scope.jumpwalletphrasenext =  function(){
          $location.url('/asset/walletphrase_next');
        }
  }]);
});
