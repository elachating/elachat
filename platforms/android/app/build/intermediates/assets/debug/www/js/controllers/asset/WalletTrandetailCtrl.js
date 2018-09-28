define(['app'],function(app){
  'use strict';
  app.register.controller('WalletTrandetailCtrl',[
    '$scope',
    '$rootScope',
    '$stateParams',
    '$location',
    '$state',
    '$translate',
    function($scope,$rootScope,$stateParams,$location,$state,$translate){
        $scope.backwalletmainofdetail= function(){
          $state.go('wallet_main', {chainida:$stateParams.chainidd});
        }
        window.webspvwalletapi.trandetail(function(successd){
           var result =  eval('(' + successd + ')');
           $scope.zzsum = result['amount'];
           $scope.zzfee = result['fee'];
           $scope.zzdate = result['adddate'];
           $scope.inputaddr = result['toaddress'];
           $scope.inputaddr = result['toaddress'];
           $scope.confirmnum = result['confirmnum'];
           $scope.blockheight = result['blockheight'];
           $scope.zztranferid = result['txhash'];
           if(result['inorout']=="in"){
             $("#foriadr").html($translate.instant("wallet_translatedetail_transfrom_inputadr"));
             if(result['confirmstatus']=="Confirmed"){
                    $("#curtxidstatus").html("&#xe8d7;");
                    $("#curtxidstatus").css("background-color","#009933");
                    $("#txidstatustxt").html($translate.instant("wallet_translatedetail_transfrom_receive_success"));
             }else{
                    $("#curtxidstatus").html("&#xe680;");
                    $("#txidstatustxt").html($translate.instant("wallet_translatedetail_transfrom_confirming"));
             }
           }else{
             $("#foriadr").html($translate.instant("wallet_translatedetail_transfrom_outputadr"));
             if(result['confirmstatus']=="Confirmed"){
                    $("#curtxidstatus").html("&#xe8d7;");
                    $("#curtxidstatus").css("background-color","#009933");
                    $("#txidstatustxt").html($translate.instant("wallet_translatedetail_transfrom_transform_success"));
             }else{
                    $("#curtxidstatus").html("&#xe680;");
                    $("#txidstatustxt").html($translate.instant("wallet_translatedetail_transfrom_confirming"));
             }
           }
            var qrcode = new QRCode(document.getElementById("txidqrcode"), {
                width : 100,
                height : 100
            });
            qrcode.makeCode("https://blockchain.elastos.org/tx/"+result['txhash']);
        },function(erron){
           // console.log("获取交易信息失败！");
        },$stateParams.chainidd,$stateParams.txid,$stateParams.noid);
  }]);
});
