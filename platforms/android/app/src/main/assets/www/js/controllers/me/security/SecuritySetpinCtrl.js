define(['app'],function(app){
  'use strict';
  app.register.controller('SecuritySetpinCtrl',[
    '$scope',
    '$rootScope',
    '$stateParams',
    '$location',
    '$translate',
    function($scope,$rootScope,$stateParams,$location,$translate){
        var pin_store = localStorage.getItem("PIN");
        var set = true;
        if(pin_store){
            $scope.pin_tip = $translate.instant("me_security_pin_tip");
        }else{
            $scope.pin_tip = $translate.instant("me_security_pinset_tip");
        }

        var num = [];
        var confirmnum = [];
        $scope.addnum =  function(){
            var poingui = document.getElementById("pointui");
            var margin = parseInt(pointui.style.marginLeft);
            if(margin < -12){
                poingui.style.marginLeft= String(margin + 17)+ "px"
                num.push(event.target.innerHTML);
                console.log(num);
            }
            if(num.length == 6){
                pointui.style.marginLeft = "-102px";
                $scope.confirmpin();
            }
        }
        $scope.deletenum =  function(){
            console.log("deletenum");
            var poingui = document.getElementById("pointui");
            var margin = parseInt(pointui.style.marginLeft);
            if(margin > -102){
                poingui.style.marginLeft= String(margin - 17)+ "px"
                num.pop();
                console.log(num);
            }
        }
        $scope.confirmpin = function(){

            console.log("num = "+num);
            pin_store = localStorage.getItem("PIN");

            if(set){
                if(pin_store){
                    if(num.join('') == pin_store){
                        $scope.pin_tip = $translate.instant("me_security_pinset_tip");
                        localStorage.setItem("PIN",'');
                    }else{
			            navigator.webtoast.showtoast($translate.instant("me_security_pinset_error_tip"),1);
                        $location.url('/me/security/index');
                    }


                 }else{
                    $scope.pin_tip = $translate.instant("me_security_repinset_tip");
                    confirmnum = num;
                    set = false;
                 }
            }else{
                if(confirmnum.join('') == num.join('')){
                    //alert("PIN设置成功");
                    navigator.webtoast.showtoast($translate.instant("me_security_pinset_success_tip"),1);
                    localStorage.setItem("PIN",num.join(''));
                    $location.url('/me/security/index');
                }else{
                   // alert("重复PIN错误");
                    navigator.webtoast.showtoast($translate.instant("me_security_repinset_error_tips"),1);
                    $scope.pin_tip = $translate.instant("me_security_pinset_tip");
                    confirmnum = [];
                    set = true;
                }
            }
            num = [];
        }
  }]);
});
