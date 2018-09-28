define(['app'],function(app){
  'use strict';
  app.register.controller('MePayPwdCtrl',[
    '$scope',
    '$rootScope',
    '$stateParams',
    '$location',
    '$state',
    'ngDialog',
    '$translate',
    function($scope,$rootScope,$stateParams,$location,$state,ngDialog,$translate){
        $scope.walletindexback =  function(){
            $location.url('/me/wallet/index');
        }
        $scope.backup =  function(){
            window.webspvwalletapi.exportwalletmo(function(success){
                if(success == "error" ){
                    ngDialog.open({
                         template: '<div style="width:100%;height:30px;border-bottom:1px solid #e5e5e5;><h4 class="modal-title">错误</h4></div>' +
                                   '<div class="modal-body" style="width:100%;height:100px;color:#444;line-height:100px;text-align:center;font-weight:800;font-size:20px;"><i class="iconfont" style="color:red;font-size:26px;">&#xe665;</i>&nbsp;支付密码错误！</div>'+
                                   '<div class="modal-footer" style="width:80%;height:60px;margin-left:10%;padding-top:10px;padding-bottom:20px;">'+
                                   '<button type="button" style="font-size:14px;border:0px;border-radius:3px;width:80%;margin-left:10%;height:40px;line-height:40px;background-color:#0070c9;color:#fff;text-align:center;" class="btn" ng-click="confirm()" >确定</button></div>',
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
                }else{
                    $location.url('/me/wallet/backup_phrase?phrase='+success);
                }
            },function(error){
                //console.log("错误"+error);
            },$scope.paypassword);
        }
  }]);
});
