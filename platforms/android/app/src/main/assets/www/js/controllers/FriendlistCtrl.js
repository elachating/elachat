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
                navigator.webtoast.showtoast($translate.instant("friendlist_index_offline_tip"),1);
            }else{
                $state.go('frienddetail', {fuid:fuid,nickname:nickname});
            }
        }
        window.webcarrierapi.friendlist(function(successful){

        if(window.localStorage.fulistnick == "undefined" || window.localStorage.fulistnick == undefined){
             var jsonObj = JSON.parse(successful);
             var json = {};
             for(var i=0;i<jsonObj.length;i++){
                var fuid = jsonObj[i]['uid'];
                json[fuid] = jsonObj[i]['nickname'];
             }
             window.localStorage.fulistnick = JSON.stringify(json);
        }else{
             var jsonObj = JSON.parse(successful);
             var jsonObja = JSON.parse(window.localStorage.fulistnick);
             for(var i=0;i<jsonObj.length;i++){
                var fuid = jsonObj[i]['uid'];
                if(jsonObja.hasOwnProperty(fuid)){
                    if(jsonObj[i]['nickname'].indexOf("...(Offline)")<0){
                        jsonObja[fuid] = jsonObj[i]['nickname'];
                    }
                }else{
                    jsonObja[fuid] = jsonObj[i]['nickname'];
                }
             }
             window.localStorage.fulistnick = JSON.stringify(jsonObja);
        }
        $scope.data = eval('(' + successful + ')');
        },function(error){
            console.log(error);
        })
    }]);
});
