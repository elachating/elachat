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
        },'english');
        //window.localStorage.mnemonicone = "a b c d e f g h i j k l";
       // $scope.words = window.localStorage.mnemonicone;
        $scope.jumpwalletphrasenext =  function(){
          $location.url('/asset/walletphrase_next');
        }
  }]);
});
