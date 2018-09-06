define(['app','services/SpvService'],function(app){
  'use strict';
  app.register.controller('AssetCtrl',[
    '$scope',
    '$state',
    '$rootScope',
    '$stateParams',
    '$location',
    'SpvService',
    'ngDialog',
    function($scope,$state,$rootScope,$stateParams,$location,SpvService,ngDialog){
        $scope.showapp = function(){
            navigator.webtoast.showtoast("暂无应用！",1);
        }
        $scope.jumpassetdetail =  function(chainid){
          $state.go('wallet_main', {chainida:chainid});
        }
       /*
        $scope.jumpwalletlist =  function(){
                window.webspvwalletapi.changepaypassword(function(successa){
                    console.log("修改支付密码结果！" + successa);
                },function(errora){
                    console.log("错误"+errora);
                },"","");
        }
       window.webspvwalletapi.getallmasterwallet(function(success){
            if(success=="[]"){
                $location.url('/asset/wallet_init');
            }else{
                window.webspvwalletapi.walletinfo(function(successa){
                    $scope.walletname = successa;
                },function(errora){
                    console.log("错误"+errora);
                });
            }
        },function(error){
            console.log("错误:"+error);
        });
        */
        SpvService.walletyn().then(function(successful){
            SpvService.walletinfo(successful).then(function(successa){
                $scope.walletname = successa;
            });
        });
        SpvService.getbalance().then(function(successful){
           var subwallets =  eval('(' + successful + ')');
           $scope.data = eval('(' + successful + ')');
           for(var j=0;j<subwallets.length;j++){
                if(subwallets[j]['chainid']=="ELA"){
                    $.getJSON('http://cloudchat.io/quota/op.php?parm=detail&maincoin=usdt&subcoin=ela', function (data) {
                        if(data.status !== "ok") {
                                return false;
                        }
                        data = data.tick;
                         $("#allsums").html("≈ "+((data.close*6.8) * parseFloat(subwallets[j]['balance'])).toFixed(4)+" CNY<span style='font-size:12px;color:#aaa;'>(huobi行情)</span>");
                    })
                    break;
                }
           }
           });
  }]);
});
