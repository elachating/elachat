define(['app'],function(app){
  'use strict';
  app.register.controller('ScanCtrl',[
    '$scope',
    '$rootScope',
    '$location',
    function($scope,$rootScope,$location){
                 //console.log("我在这块");
                 //$location.url("/addfriend");
        $scope.jumpaddfriend = function(){
            window.QRScanner.destroy(
                function(status){
             });
           $location.url('/addfriend');
        }
        document.addEventListener("deviceready",onDeviceReady,false);
        function onDeviceReady(){
            document.addEventListener("backbutton",onBackButton,false);
        }
        function onBackButton(){
                 if($location.path()=="/scan"){
                     window.QRScanner.destroy(
                        function(status){
                     });
                     window.location.href = "index.html#/addfriend"
                 }else if($location.path()=="/addfriend"){
                     window.location.href = "index.html#/friendlist"
                 }else{
                    history.back();
                 }
        }

       if (typeof (QRScanner) != 'undefined') {
            window.QRScanner.prepare(onDone); // show the prompt
        } else {
			 navigator.webtoast.showtoast("插件加载失败!",1);
        }
        function onDone(err, status) {
            if (err) {
                console.error("错误："+err);
            }
            if (status.authorized) {
                //绑定扫描监听
                window.QRScanner.scan(displayContents);
                //开始扫描，需要将页面的背景设置成透明
                function displayContents(err, text) {
                    if (err) {
                        navigator.webtoast.showtoast("启动扫描出错!",1);
                    } else {
                        window.localStorage.curcode = text;
                        $location.url('/addfriend');
                    }
                }
                window.QRScanner.show(function(status){
                      console.log("当前状态："+status.status);
                 })
            } else if (status.denied) {
			     navigator.webtoast.showtoast("用户拒绝访问摄像头!",1);
            } else {

            }
        }
  }]);
});