define(['app'],function(app){
  'use strict';
  app.register.controller('AddfriendCtrl',[
    '$scope',
    '$rootScope',
    '$stateParams',
    '$location',
    '$translate',
    function($scope,$rootScope,$stateParams,$location,$translate){
        window.webcarrierapi.myinfo(function(successful){
            if(successful.nickname==""){
			    navigator.webtoast.showtoast($translate.instant("addfriend_before_tip"),1);
                $location.url("/selfdetail");
            }
        },
        function(error){
           console.log(error);
        },"","");
        $scope.jumpfriendlist = function(){
            $location.url("/friendlist");
        };
        $scope.scanbtn = function(){
            window.webselfscan.scan(function(successful){
                if(successful!="back"){
                  $scope.curuadr = successful;
                  document.getElementById("upid").value = successful;
                }
            },function(error){
			    navigator.webtoast.showtoast($translate.instant("addfriend_scan_error_tip"),1);
            })
        };
        $scope.finish = function (){
            var fuid = document.getElementById("upid").value;
            var message =$scope.uremark;
            window.webcarrierapi.joinfriend(function(successful){
                if(successful=="1"){
			        navigator.webtoast.showtoast($translate.instant("addfriend_send_successful_tip"),1);
                }else if(successful=="-1"){
			        navigator.webtoast.showtoast($translate.instant("addfriend_send_error_tip"),1);
                }
            },function(error){
            }, fuid,message)
         }
    }]);
});
