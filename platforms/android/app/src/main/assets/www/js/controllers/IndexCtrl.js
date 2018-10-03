define(['app'],function(app){
  'use strict';
  app.register.controller('IndexCtrl',[
    '$scope',
    '$rootScope',
    '$location',
    '$state',
    'ngDialog',
    '$http',
    '$translate',
    function($scope,$rootScope,$location,$state,ngDialog,$http,$translate){
      if (window.localStorage.nowys === undefined || window.localStorage.nowys === 'undefined') {
        localStorage.nowys=1;
      }
        document.addEventListener("deviceready",function(){
            document.addEventListener("backbutton", function(){
                console.log("当前地址："+ $location.url());
                if($location.url()=="/" || $location.url()=="/me/index" || $location.url()=="/quotaindex" || $location.url()=="/asset"){
                     navigator.app.exitApp();
                }else if($location.url()=="/asset/walletphrase_next"){
                        navigator.webtoast.showtoast("请点击右上角关闭！",1);
                       /*
                        ngDialog.open({
                         template: '<div style="width:100%;height:30px;border-bottom:1px solid #e5e5e5;><h4 class="modal-title">提示</h4></div>' +
                                   '<div class="modal-body" style="width:100%;height:100px;color:#444;line-height:100px;text-align:center;font-weight:800;font-size:14px;">&nbsp;确定退出确认助记词？</div>'+
                                   '<div class="modal-footer" style="width:80%;height:60px;margin-left:10%;padding-top:10px;padding-bottom:20px;">'+
                                   '<button type="button" style="margin:0px;float:left;font-size:14px;border:0px;border-radius:3px;width:30%;margin-left:10%;height:40px;line-height:40px;background-color:#0070c9;color:#fff;text-align:center;" class="btn" ng-click="confirms()" >确定</button>'+
                                   '<button type="button" style="margin:0px;float:left;margin-left:20%;font-size:14px;border:0px;border-radius:3px;width:30%;height:40px;line-height:40px;background-color:#0070c9;color:#fff;text-align:center;" class="btn" ng-click="canclenbtns()" >取消</button>'+
                                   '</div>',
                        plain:true,
                                 className: 'ngdialog-theme-default',
                                 width:'80%',
                                 scope: $scope,
                                 controller: function ($scope) {
                                     $scope.confirms = function () {
                                            console.log("删除");
                                            $scope.closeThisDialog();

                                             history.go(-2);
                                            //$location.url("/asset/wallet_create");
                                     };
                                     $scope.canclenbtns = function () {
                                            $scope.closeThisDialog();
                                     };
                                 }
                        });
                    */
                 }else if($location.url()=="/me/security/index"){
                    // $location.url("/me/index");
                    $state.go('me');
                  }else{
                      history.back();
                  }
            }, false);
        },false);

        $http({
                method: 'GET',
                url: 'https://ela.chat/version/up.json'
            }).then(function successCallback(response) {
                if(AppVersion.build!=response.data){
                       $scope.upred = true;
                }
            }, function errorCallback(response) {
                console.log(response)
            });
         window.webcarrierapi.myinfo(function(successful){
             window.webdbapi.newmessage(function(success){
                 var obj = eval('(' + success + ')');
                if(window.localStorage.fulistnick=="undefined" || window.localStorage.fulistnick==undefined){
                    var jsonObj = "";
                }else{
                    var jsonObj = JSON.parse(window.localStorage.fulistnick);
                }
                 for(var i in obj){
                        var date = new Date(obj[i].curtime);
                        var time1 = date.getTime();
                        var y = new Date().getFullYear();
                        var m = new Date().getMonth()+1;
                        var d = new Date().getDate();
                        var time2 = new Date(y+"-"+m+"-"+d).getTime();
                        if(time1>time2){
                            var y = date.getFullYear();
                            var m = date.getMonth()+1;
                            var d = date.getDate();
                            var h = date.getHours();
                            var mm = date.getMinutes();
                            var s = date.getSeconds();
                            obj[i].curtime = h+':'+mm+':'+s
                        }else{
                            obj[i].curtime = y+'-'+m+'-'+d
                        }
                        if(jsonObj!=""){
                            var curfuid = obj[i].friendId;
                            obj[i].nickname = jsonObj[curfuid];
                        }else{

                        }
                   /* window.webcarrierapi.getfriendinfo(function(success){
                        window.localStorage.nmnickname = success.nickname;
                    },function(error){
                        console.log("错误"+error);
                    },obj[i].friendId);
                    console.log("obj:"+obj[i].nickname);
                    obj[i].nickname = window.localStorage.nmnickname;
                    */
                 }
                    $scope.data = obj

             },function(error){
                 console.log("错误"+error);
             },successful.uid);
        },function(error){
            console.log(error);
        },"","");
        $scope.chat = function(fuid,nickname){
             $state.go('chat', {fuid:fuid,nickname:""});
        }
        $scope.showapp = function(){
           // navigator.webtoast.showtoast("暂无应用！",1);
             $state.go('wallet_init');
        }
        /*
        window.webspvwalletapi.creatememwords(function(success){
            window.localStorage.mnemonicone = success;
            console.log("助记词："+ success);
        },function(error){
            console.log("错误"+error);
        });
        window.webspvwalletapi.createmasterwallet(function(success){
            console.log("创建成功！"+success);
        },function(error){
            console.log("创建钱包失败错误"+error);
        },"我的Ela钱包",window.localStorage.mnemonicone,"11111111", "11111111", "chinese");

        window.webspvwalletapi.getallmasterwallet(function(success){
            if(success=="[]"){
                console.log("数组长度为0");
            }else{
                console.log("数组长度为："+success);
            }
        },function(error){
            console.log("错误"+error);
        });
      }
      */
  }]);
});
