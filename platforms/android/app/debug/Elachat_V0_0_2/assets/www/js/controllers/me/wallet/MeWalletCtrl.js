define(['app'],function(app){
  'use strict';
  app.register.controller('MeWalletCtrl',[
    '$scope',
    '$rootScope',
    '$stateParams',
    '$location',
	'ngDialog',
	'$translate',
    function($scope,$rootScope,$stateParams,$location,ngDialog,$translate){
        $scope.meindexbacks =  function(){
            $location.url('/me/index');
        }
        $scope.backupWords =  function(){
            $location.url('/me/wallet/backup_inputPayPwd');
        }
        $scope.backupFiles =  function(){
            $location.url('/me/wallet/backup_file');
        }
        $scope.resetPayPassword =  function(){
            $location.url('/me/wallet/reset_paypwd');
        }
        $scope.removeWallet =  function(){
			ngDialog.open({
			 template: '<div style="width:100%;height:30px;border-bottom:1px solid #e5e5e5;><h4 class="modal-title">'+ $translate.instant("me_wallet_index_delwallet_tip_title") +'</h4></div>' +
					   '<div class="modal-body" style="width:100%;height:100px;color:#444;line-height:100px;text-align:center;font-weight:800;font-size:14px;">&nbsp;'+ $translate.instant("me_wallet_index_delwallet_tip_content") +'</div>'+
					   '<div class="modal-footer" style="width:80%;height:60px;margin-left:10%;padding-top:10px;padding-bottom:20px;">'+
					   '<button type="button" style="margin:0px;float:left;font-size:14px;border:0px;border-radius:3px;width:30%;margin-left:10%;height:40px;line-height:40px;background-color:#0070c9;color:#fff;text-align:center;" class="btn" ng-click="confirm()" >'+ $translate.instant("me_wallet_index_delwallet_tip_confirmbtn") +'</button>'+
					   '<button type="button" style="margin:0px;float:left;margin-left:20%;font-size:14px;border:0px;border-radius:3px;width:30%;height:40px;line-height:40px;background-color:#0070c9;color:#fff;text-align:center;" class="btn" ng-click="canclenbtn()" >'+ $translate.instant("me_wallet_index_delwallet_tip_concelbtn") +'</button>'+
					   '</div>',
			plain:true,
					 className: 'ngdialog-theme-default',
					 width:'80%',
					 scope: $scope,
					 controller: function ($scope) {
						 $scope.confirm = function () {
								$scope.closeThisDialog();
                                window.webspvwalletapi.removewallet(function(success){
                                    if(success == "1"){
                                        navigator.webtoast.showtoast($translate.instant("me_wallet_index_delwallet_tip_successful"),1);

                                    }else{
                                       navigator.webtoast.showtoast($translate.instant("me_wallet_index_delwallet_tip_error"),1);
                                    }
                                },function(error){
                                    // console.log("错误"+error);
                                });
						 };
						 $scope.canclenbtn = function () {
								$scope.closeThisDialog();
						 };
					 }
			});
            //$location.url('/me/wallet/remove_wallet');
        }
  }]);
});
