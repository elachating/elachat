define(['app'],function(app){
  'use strict';
  app.register.controller('MeResetPayPwdCtrl',[
    '$scope',
    '$rootScope',
    '$stateParams',
    '$location',
    'ngDialog',
    '$translate',
    function($scope,$rootScope,$stateParams,$location,ngDialog,$translate){
        $scope.walletindexback =  function(){
            $location.url('/me/wallet/index');
        }
        $scope.reset =  function(){
            var pattern = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/;
            if(!pattern.test($scope.paypassword)){
				ngDialog.open({
				 template: '<div style="width:100%;height:30px;border-bottom:1px solid #e5e5e5;><h4 class="modal-title">'+ $translate.instant("me_wallet_resetpaypwd_tip_one_title")  +'</h4></div>' +
						   '<div class="modal-body" style="width:100%;height:100px;color:#444;line-height:100px;text-align:center;font-weight:800;font-size:14px;"><i class="iconfont" style="color:red;font-size:18px;">&#xe665;</i>&nbsp;'+ $translate.instant("me_wallet_resetpaypwd_tip_one_c")  +'</div>'+
						   '<div class="modal-footer" style="width:80%;height:60px;margin-left:10%;padding-top:10px;padding-bottom:20px;">'+
						   '<button type="button" style="font-size:14px;border:0px;border-radius:3px;width:80%;margin-left:10%;height:40px;line-height:40px;background-color:#0070c9;color:#fff;text-align:center;" class="btn" ng-click="confirm()" >'+ $translate.instant("me_wallet_resetpaypwd_tip_one_btn")  +'</button></div>',
				plain:true,
						 className: 'ngdialog-theme-default',
						 width:'80%',
						 scope: $scope,
						 controller: function ($scope) {
							 $scope.confirm = function () {
									$scope.closeThisDialog();
							 };
						 }
				});
				return false;
			}
            if($scope.paypassword == $scope.repaypassword){
                window.webspvwalletapi.changepaypassword(function(success){
                   // alert(success)
                    if(success == 1){
                     //alert("修改成功");
						ngDialog.open({
							 template: '<div style="width:100%;height:30px;border-bottom:1px solid #e5e5e5;><h4 class="modal-title">'+ $translate.instant("me_wallet_resetpaypwd_tip_tow_title")  +'</h4></div>' +
									   '<div class="modal-body" style="width:100%;height:100px;color:#444;line-height:100px;text-align:center;font-weight:800;font-size:20px;"><i class="iconfont" style="color:#0070c9;font-size:26px;">&#xe673;</i>&nbsp;'+ $translate.instant("me_wallet_resetpaypwd_tip_tow_c")  +'</div>'+
									   '<div class="modal-footer" style="width:80%;height:60px;margin-left:10%;padding-top:10px;padding-bottom:20px;">'+
									   '<button type="button" style="font-size:14px;border:0px;border-radius:3px;width:80%;margin-left:10%;height:40px;line-height:40px;background-color:#0070c9;color:#fff;text-align:center;" class="btn" ng-click="confirm()" >'+ $translate.instant("me_wallet_resetpaypwd_tip_tow_btn")  +'</button></div>',
							plain:true,
									 className: 'ngdialog-theme-default',
									 width:'80%',
									 scope: $scope,
									 controller: function ($scope) {
										 $scope.confirm = function () {
												$scope.closeThisDialog();
                                                $location.url("/me/index");
										 };
									 }
							});

                    }else{
                        //alert("修改失败");
							ngDialog.open({
								 template: '<div style="width:100%;height:30px;border-bottom:1px solid #e5e5e5;><h4 class="modal-title">'+ $translate.instant("me_wallet_resetpaypwd_tip_three_title")  +'</h4></div>' +
										   '<div class="modal-body" style="width:100%;height:100px;color:#444;line-height:100px;text-align:center;font-weight:800;font-size:20px;"><i class="iconfont" style="color:red;font-size:26px;">&#xe665;</i>&nbsp;'+ $translate.instant("me_wallet_resetpaypwd_tip_three_c")  +'</div>'+
										   '<div class="modal-footer" style="width:80%;height:60px;margin-left:10%;padding-top:10px;padding-bottom:20px;">'+
										   '<button type="button" style="font-size:14px;border:0px;border-radius:3px;width:80%;margin-left:10%;height:40px;line-height:40px;background-color:#0070c9;color:#fff;text-align:center;" class="btn" ng-click="confirm()" >'+ $translate.instant("me_wallet_resetpaypwd_tip_three_btn")  +'</button></div>',
								plain:true,
										 className: 'ngdialog-theme-default',
										 width:'80%',
										 scope: $scope,
										 controller: function ($scope) {
											 $scope.confirm = function () {
													$scope.closeThisDialog();
											 };
										 }
								});

                    }

                },function(error){
                   // alert("错误")
                   // console.log("错误"+error);
                },$scope.oldpaypassword,$scope.paypassword);
            }else{
                //alert("重复密码错误");
				ngDialog.open({
					 template: '<div style="width:100%;height:30px;border-bottom:1px solid #e5e5e5;><h4 class="modal-title">'+ $translate.instant("me_wallet_resetpaypwd_tip_four_title")  +'</h4></div>' +
							   '<div class="modal-body" style="width:100%;height:100px;color:#444;line-height:100px;text-align:center;font-weight:800;font-size:20px;"><i class="iconfont" style="color:red;font-size:26px;">&#xe665;</i>&nbsp;'+ $translate.instant("me_wallet_resetpaypwd_tip_four_c") +'</div>'+
							   '<div class="modal-footer" style="width:80%;height:60px;margin-left:10%;padding-top:10px;padding-bottom:20px;">'+
							   '<button type="button" style="font-size:14px;border:0px;border-radius:3px;width:80%;margin-left:10%;height:40px;line-height:40px;background-color:#0070c9;color:#fff;text-align:center;" class="btn" ng-click="confirm()" >'+ $translate.instant("me_wallet_resetpaypwd_tip_four_btn") +'</button></div>',
					plain:true,
							 className: 'ngdialog-theme-default',
							 width:'80%',
							 scope: $scope,
							 controller: function ($scope) {
								 $scope.confirm = function () {
										$scope.closeThisDialog();
								 };
							 }
					});
            }

        }

  }]);
});
