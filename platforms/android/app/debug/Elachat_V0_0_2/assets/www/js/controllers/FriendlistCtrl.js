define(['app'],function(app){
  'use strict';
  app.register.controller('FriendlistCtrl',[
    '$scope',
    '$state',
    '$rootScope',
    '$stateParams',
    '$location',
    '$translate',
    function($scope,$state,$rootScope,$stateParams,$location,$translate){
        $scope.jumpmyinfo = function (){
             $location.url('/selfdetail');
        };
        $scope.jumpindex = function(){
            $location.url("/index");
        };
        $scope.jumpaddfriend = function(){
            $location.url("/addfriend");
        }
        $scope.jumpnewfriendlist = function(){
            $location.url("/newfriendlist");
        }
        $scope.frienddetail = function(fuid,nickname,status){
            //$stateParams.fuid = fuid;
            //$stateParams.nickname = nickname;
            //navigator.webtoast.showtoast("选择的好友UID："+fuid,1);
            //$location.url("/frienddetail");
            //console.log("fuid:"+fuid+"；nickname:"+nickname);
            if(status=="0"){
                navigator.webtoast.showtoast("该好友不在线！",1);
            }else{
                $state.go('frienddetail', {fuid:fuid,nickname:nickname});
            }

        }
        window.webcarrierapi.friendlist(function(successful){
             $scope.data = eval('(' + successful + ')');
           // console.log("列表："+successful.nickname);
            //console.log(successful);
        },function(error){
            console.log(error);
        })
    }]);
});
