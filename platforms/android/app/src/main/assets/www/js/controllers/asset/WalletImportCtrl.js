define(['app'],function(app){
  'use strict';
  app.register.controller('WalletImportCtrl',[
    '$scope',
    '$rootScope',
    '$stateParams',
    '$location',
    '$state',
    function($scope,$rootScope,$stateParams,$location,$state){
		$scope.assetinit = function(){
          $location.url('/asset/wallet_init');
		}
		$(".importmobtn").click(function(){
			$(".import_privf_body").hide();
			$(".import_mono_body").show();
			$(".importkfbtn").css({"border-bottom":"0px","color":"#e5e5e5"});
			$(this).css({"border-bottom":"2px solid #38cced","color":"#fff"});
			
		});
		$(".importkfbtn").click(function(){
			$(".import_mono_body").hide();
			$(".import_privf_body").show();
			$(".importmobtn").css({"border-bottom":"0px","color":"#e5e5e5"});
			$(this).css({"border-bottom":"2px solid #38cced","color":"#fff"});
		});
		$scope.importmonobtn = function(){
            var pattern = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/;
			var lang = "chinese";
            if(!pattern.test($scope.paypassword)){
			        navigator.webtoast.showtoast("支付密码不能为空,且8到20位数字与字母组合！",1);
			        return false;
            }
            if($scope.paypassword !=$scope.repaypassword){
			        navigator.webtoast.showtoast("支付密码两次输入不一致！",1);
			        return false;
            }
            //chainid,contents,phrasePassword,paypassword,lang
			window.webspvwalletapi.importmono(function(success){
				if(success=="1"){
				    window.localStorage.walletname="ELA";
					window.localStorage.walletyn = "1";
					navigator.webtoast.showtoast("导入成功！",1);
					$state.go("asset");
				}else{
					navigator.webtoast.showtoast("导入失败："+success,1);
				}
				
			},function(error){
				navigator.webtoast.showtoast("导入钱包失败！",1);
			},"ELA",$scope.phrasecontents,$scope.pharmpassword,$scope.paypassword,lang);
		}
		$scope.imporfiletbtn = function(){
            var pattern = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/;
            if($scope.keyspassword==""){
			        navigator.webtoast.showtoast("私钥密码不能为空!",1);
			        return false;
            }
            if(!pattern.test($scope.payspassword)){
			        navigator.webtoast.showtoast("支付密码不能为空,且8到20位数字与字母组合！",1);
			        return false;
            }
            if($scope.payspassword !=$scope.repayspassword){
			        navigator.webtoast.showtoast("支付密码两次输入不一致！",1);
			        return false;
            }
			window.webspvwalletapi.importkeyfile(function(success){
				if(success=="1"){
				    window.localStorage.walletname="ELA";
					window.localStorage.walletyn = "1";
					navigator.webtoast.showtoast("导入成功！",1);
					$state.go("asset");
				}else{
					navigator.webtoast.showtoast("导入失败："+success,1);
				}
				
			},function(error){
				navigator.webtoast.showtoast("导入钱包失败！",1);
			},"ELA",$scope.key_c,$scope.backuppassword,$scope.payspassword,"");	
		}
  }]);
});
