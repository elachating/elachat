define(['app'],function(app){
  'use strict';
  app.register.controller('WalletReceiveCtrl',[
    '$scope',
    '$rootScope',
    '$stateParams',
    '$location',
    '$state',
    function($scope,$rootScope,$stateParams,$location,$state){
        $scope.chainidwalletname = $stateParams.chainidb +" - Wallet";
        console.log("传值："+$stateParams.chainidb);
        $scope.backwalletmain = function(){
          $state.go('wallet_main', {chainida:$stateParams.chainidb});
        }
        $scope.copytxt = function(){
           // window.clipboardData.setData("text",$("#wadr").html());
                  var input = document.createElement("input");
                   input.value = $("#wadr").html();
                   document.body.appendChild(input);
                   input.select();
                   input.setSelectionRange(0, input.value.length), document.execCommand('Copy');
                   document.body.removeChild(input);

			navigator.webtoast.showtoast("复制成功！",1);
        }
        window.webspvwalletapi.addresslist(function(successa){
            console.log("地址列表："+ eval('(' + successa + ')').Addresses[0]);
        $scope.chainidaddress =  eval('(' + successa + ')').Addresses[0];
            var qrcode = new QRCode(document.getElementById("waqrcode"), {
                width : 200,
                height : 200
            });
            qrcode.makeCode(eval('(' + successa + ')').Addresses[0]);
        },function(errora){
            console.log("错误"+errora);
        },$stateParams.chainidb);
  }]);
});
