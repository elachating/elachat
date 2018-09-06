define(['app'],function(app){
  'use strict';
  app.register.controller('MeFeedbackCtrl',[
    '$scope',
    '$rootScope',
    '$stateParams',
    '$location',
    '$http',
    function($scope,$rootScope,$stateParams,$location,$http){
       $scope.meindexback_feed = function(){
            $location.url("/me/index");
       }
    $scope.submit = function(){
    console.log("scope.title = "+$scope.title)
        if($scope.title == undefined){
            navigator.webtoast.showtoast("请输入标题！",1);
            return;
        }else if($scope.content == undefined){
            navigator.webtoast.showtoast("请输入内容！",1);
            return;
        }
        $http({
            method: 'POST',
            url: 'http://192.168.0.105/public/index.php/me/feed/index',
            data: {"title":$scope.title,"content":$scope.content,"email":$scope.email,"phone":$scope.phone}
        }).then(function successCallback(response) {
            console.log("responsedata = "+response.data.msg)
            if(response.data.code == "1"){
                navigator.webtoast.showtoast("信息提交成功！",1);
            }else{
                navigator.webtoast.showtoast("信息提交失败！",1);
            }
        }, function errorCallback(response) {
            console.log(response)
        });
    }
  }]);
});
