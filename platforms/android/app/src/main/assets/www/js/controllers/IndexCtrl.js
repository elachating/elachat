define(['app'],function(app){
  'use strict';
  app.register.controller('IndexCtrl',[
    '$scope',
    '$rootScope',
    '$location',
    '$state',
    '$translate',
    function($scope,$rootScope,$location,$state,$translate){
       // $scope.message_title = $translate.instant('new_message_title');
        document.addEventListener("deviceready",function(){
            console.log("deviceready");
            document.addEventListener("backbutton", function(){
                if($location.url()=="/" || $location.url()=="/me/index" || $location.url()=="/quotaindex" || $location.url()=="/asset"){
                     navigator.app.exitApp();
                }else{
                      history.back();
                  }
            }, false);
        },false);
         window.webcarrierapi.myinfo(function(successful){
             window.webdbapi.newmessage(function(success){
                 var obj = eval('(' + success + ')');
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
            navigator.webtoast.showtoast("暂无应用！",1);
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
