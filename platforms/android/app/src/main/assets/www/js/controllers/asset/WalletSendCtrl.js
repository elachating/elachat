define(['app'],function(app){
  'use strict';
  app.register.controller('WalletSendCtrl',[
    '$scope',
    '$state',
    '$rootScope',
    '$stateParams',
    '$location',
    'ngDialog',
    function($scope,$state,$rootScope,$stateParams,$location,ngDialog){
        if($stateParams.toadr!=""){
            $scope.toaddress = $stateParams.toadr;
        }
        $scope.backwalletmains = function(){
          $state.go('wallet_main', {chainida:$stateParams.chainidc});
         // $state.go('wallet_main', {chainida:"ELA"});
        }
        window.webspvwalletapi.addresslist(function(successa){
            $scope.fromaddress =  eval('(' + successa + ')').Addresses[0];
        },function(errora){
            console.log("错误"+errora);
        },$stateParams.chainidc);

        window.webspvwalletapi.getbalance(function(successa){
            $scope.restb = successa;
        },function(errora){
            console.log("错误"+errora);
        },$stateParams.chainidc);

        $scope.scansendbtn = function(){
            window.webselfscan.scan(function(successful){
                if(successful!="back"){
                  $scope.curuadr = successful;
                  document.getElementById("toaddress").value = successful;
                }
            },function(error){
			        navigator.webtoast.showtoast("无法识别!",1);
            })
        };
        $("#toaddress").blur(function(){
           window.webspvwalletapi.judgewalletadr(function(sufa){
              if(sufa!="1"){
                    $("#walletadrerror").show();
              }else{
                    $("#walletadrerror").hide();
              }
           },function(era){

           },$(this).val());
        });
        $("#amount").blur(function(){
           var flag = false;
           if($(this).val() === "" || $(this).val() ==null){
                flag = false;
            }else{
                if(!isNaN($(this).val())){
                    flag = true;
                }else{
                    flag = false;
                }
            }
          if(flag){
                $("#amounterror").hide();
          }else{
                $("#amounterror").show();
          }
        });
        $scope.sendbtn = function(){
            var fromaddress = $("#fromaddress").val();
            var toaddress = $("#toaddress").val();
            var amount = $("#amount").val();
            var momo = $("#momo").val();
            window.webspvwalletapi.getfee(function(successa){
                ngDialog.open({
                     template: '<div style="width:100%;height:30px;border-bottom:1px solid #e5e5e5;><h4 class="modal-title">付款信息</h4></div>' +
                               '<div class="modal-body" style="width:100%;height:100px;">'+
                               '<div style="width:100%;height:40px;"><span style="width:30%;float:left;height:40px;line-height:40px;display:block;">手续费：</span><div style="width:70%;hegiht:40px;line-height:40px;">'+(successa/100000000)+'</div></div>'+
                               '<div style="width:100%;height:40px;"><span style="width:30%;float:left;height:40px;line-height:40px;display:block;">支付密码：</span><input type="password" style="height:30px;float:left;width:70%;margin-top:5px;" ng-model="paypassword" /></div>'+
                               '</div>'+
                               '<div class="modal-footer" style="width:80%;height:60px;margin-left:10%;padding-top:10px;padding-bottom:20px;">'+
                               '<button type="button" style="font-size:14px;border:0px;border-radius:3px;width:80%;margin-left:10%;height:40px;line-height:40px;background-color:#0070c9;color:#fff;text-align:center;" class="btn" ng-click="confirm()" >确定支付</button></div>',
                    plain:true,
                             className: 'ngdialog-theme-default',
                             width:'80%',
                             scope: $scope,
                             controller: function ($scope) {
                                 $scope.confirm = function () {
                                        $scope.closeThisDialog();
                                    console.log('支付密码：'+$scope.paypassword);
                                    window.webspvwalletapi.sendcoin(function(successb){
			                            navigator.webtoast.showtoast("付款成功！",1);
                                        $state.go('wallet_main', {chainida:$stateParams.chainidc});
                                    },function(errorb){
			                            navigator.webtoast.showtoast("密码错误或者余额不足！",1);
                                    },$stateParams.chainidc,$scope.paypassword,fromaddress,toaddress,amount*100000000,momo)
                                 };
                             }
                    });
            },function(errora){
                console.log("错误："+errora);
            },$stateParams.chainidc,fromaddress,toaddress,amount*100000000,momo)
        }
  }]);
});
