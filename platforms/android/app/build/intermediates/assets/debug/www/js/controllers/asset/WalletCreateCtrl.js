define(['app'],function(app){
  'use strict';
  app.register.controller('WalletCreateCtrl',[
    '$scope',
    '$rootScope',
    '$stateParams',
    '$location',
    '$translate',
    function($scope,$rootScope,$stateParams,$location,$translate){
        $scope.backwalletinit =  function(){
          $location.url('/asset/wallet_init');
        }
        $scope.createwalletbtnone = function(){

            if($scope.walletname == "" || $scope.walletname == null || $scope.walletname == undefined){
			        navigator.webtoast.showtoast($translate.instant("wallet_ctrate_index_tip_walletname_no_empty"),1);
			        return false;
            }
            var pattern = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/;
            if(!pattern.test($scope.paypassword)){
			        navigator.webtoast.showtoast($translate.instant("wallet_ctrate_index_tip_paypassword_no_empty"),1);
			        return false;
            }
            if($scope.paypassword !=$scope.repaypassword){
			        navigator.webtoast.showtoast($translate.instant("wallet_ctrate_index_tip_paypassword_twice_no"),1);
			        return false;
            }

           if(!pattern.test($scope.parmpassword)){
			        navigator.webtoast.showtoast($translate.instant("wallet_ctrate_index_tip_phrase_no_empty"),1);
			        return false;
            }
            if($scope.parmpassword !=$scope.reparmpassword){
			        navigator.webtoast.showtoast($translate.instant("wallet_ctrate_index_tip_phrase_twice_no"),1);
			        return false;
            }
            window.localStorage.walletname = $scope.walletname;
            window.localStorage.paypwd = $scope.paypassword;
            window.localStorage.wordpwd = $scope.parmpassword;
            $location.url('/asset/wallet_phrase');
        }
  }]);
});