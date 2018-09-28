define(['app'],function(app){
  'use strict';
  app.register.controller('SelfdetailCtrl',[
    '$scope',
    '$rootScope',
    '$location',
    '$timeout',
    '$translate',
    function($scope,$rootScope,$location,$timeout,$translate){
        $scope.jumpcontactindex = function (){
            $location.url('/friendlist');
        };
        $scope.editnickname = function(){
            var nickname = document.getElementById("nickname");
            var editbtn = document.getElementById("editbtn");
            var curstatus = editbtn.getAttribute("curstatus");
            if(curstatus=="0"){
                nickname.removeAttribute("disabled");
                editbtn.innerHTML = "&#xe8d7";
                editbtn.setAttribute("curstatus","1");
            }else{
                var nicknamea = nickname.value;
                editbtn.setAttribute("curstatus","0");
                nickname.setAttribute("disabled","disabled");
                editbtn.innerHTML = "&#xe603";
                window.webcarrierapi.setmyinfo(function(successful){
                    navigator.webtoast.showtoast($translate.instant("me_info_set_tip"),1);
                },function(error){
                },nicknamea,"","");
            }
        };
        window.webcarrierapi.myinfo(function(successful){
            $scope.uid = successful.uid;
            $scope.uaddress = successful.uaddress;
            $scope.nickname = successful.nickname;
            var qrcode = new QRCode(document.getElementById("qrcode"), {
                width : 200,
                height : 200
            });
            qrcode.makeCode(successful.uaddress);
        },function(error){
            console.log(error);
        },"","");
  }]);
});
