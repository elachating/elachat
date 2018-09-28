define(['app'],function(app){
  'use strict';
  app.register.controller('WalletCreateCtrl',[
    '$scope',
    '$rootScope',
    '$stateParams',
    '$location',
    function($scope,$rootScope,$stateParams,$location){
        $scope.backwalletinit =  function(){
          $location.url('/asset/wallet_init');
        }
        $scope.createwalletbtnone = function(){

            if($scope.walletname == "" || $scope.walletname == null || $scope.walletname == undefined){
			        navigator.webtoast.showtoast("钱包名称不能为空！",1);
			        return false;
            }
            var pattern = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/;
            if(!pattern.test($scope.paypassword)){
			        navigator.webtoast.showtoast("支付密码不能为空,且8到20位数字与字母组合！",1);
			        return false;
            }
            if($scope.paypassword !=$scope.repaypassword){
			        navigator.webtoast.showtoast("支付密码两次输入不一致！",1);
			        return false;
            }

           if(!pattern.test($scope.parmpassword)){
			        navigator.webtoast.showtoast("短语密码不能为空,且8到20位数字与字母组合！",1);
			        return false;
            }
            if($scope.parmpassword !=$scope.reparmpassword){
			        navigator.webtoast.showtoast("短语密码两次输入不一致！",1);
			        return false;
            }
            window.localStorage.walletname = $scope.walletname;
            window.localStorage.paypwd = $scope.paypassword;
            window.localStorage.wordpwd = $scope.parmpassword;
            $location.url('/asset/wallet_phrase');
        }
  }]);
});