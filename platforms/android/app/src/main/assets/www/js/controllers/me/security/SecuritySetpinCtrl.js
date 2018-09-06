define(['app'],function(app){
  'use strict';
  app.register.controller('SecuritySetpinCtrl',[
    '$scope',
    '$rootScope',
    '$stateParams',
    '$location',
    function($scope,$rootScope,$stateParams,$location){
      //service.config($rootScope);
        var pin_store = localStorage.getItem("PIN");
        var set = true;
        if(pin_store){
            $scope.pin_tip = "请输入PIN码"
        }else{
            $scope.pin_tip = "请设置PIN码"
        }

        var num = [];
        var confirmnum = [];
        $scope.addnum =  function(){
            console.log("addnum");
            var poingui = document.getElementById("pointui");
            var margin = parseInt(pointui.style.marginLeft);
            if(margin < -12){
                poingui.style.marginLeft= String(margin + 17)+ "px"
                num.push(event.target.innerHTML);
                console.log(num);
            }
            if(num.length == 6){
                //
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
                        console.log("设置新的PIN");
                        $scope.pin_tip = "请设置新的PIN";
                        localStorage.setItem("PIN",'');
                    }else{
                        alert("PIN错误");
                        $location.url('/me/security/index');
                    }


                 }else{
                    $scope.pin_tip = "请重复输入PIN码"
                    confirmnum = num;
                    //localStorage.setItem("PIN",num);
                    set = false;
                 }


            }else{

                console.log("confirmnum = " + confirmnum);
                console.log("num = " + num);
                if(confirmnum.join('') == num.join('')){
                    alert("PIN设置成功");
                    localStorage.setItem("PIN",num.join(''));
                    $location.url('/me/security/index');
                }else{
                    alert("重复PIN错误");
                    $scope.pin_tip = "请设置PIN码";
                    confirmnum = [];
                    set = true;
                }
            }
            num = [];
        }
  }]);
});
