define(['app','services/SpvService'],function(app){
  'use strict';
  app.register.controller('WalletMainCtrl',[
    '$scope',
    '$rootScope',
    '$stateParams',
    '$location',
    'SpvService',
    '$state',
    function($scope,$rootScope,$stateParams,$location,SpvService,$state){
        $scope.main_chainid = $stateParams.chainida;
        $scope.backwalletindex = function(){
          $location.url('/asset');
        }
       // window.webspvwalletapi.alltractionlist(function(successd){
           SpvService.alltractionlist($stateParams.chainida).then(function(successd){
               var result =  eval('(' + successd + ')');
               $scope.walletname_detail = result['walletname'];
               $scope.balanceofasset= result['balance'];
               $scope.transactionlist = eval('(' +result['transactionlistss'] + ')');
               $.getJSON('http://ela.chat/quota/op.php?parm=detail&maincoin=usdt&subcoin=ela', function (data) {
                    if(data.status !== "ok") {;
                            return false;
                    }
                    data = data.tick;
                    $("#allsum").html("≈ "+((data.close*6.8) * parseFloat(result['balance'])).toFixed(4)+" CNY<span style='font-size:10px;color:#e5e5e5;'>(huobi行情)</span>");
                });
           })
       // },function(erron){
       // },$stateParams.chainida);
        $scope.jumpwalletsend =  function(){
          $state.go('wallet_send', {chainidc:$stateParams.chainida,toadr:""});
        }
        $scope.jumpwalletreceive =  function(){
          $state.go('wallet_receive', {chainidb:$stateParams.chainida});
        }
        $scope.jumptrandetail =  function(txid,noid){
          $state.go('wallet_transactiondetail', {chainidd:$stateParams.chainida,txid:txid,noid:noid});
        }
  }]);
});
