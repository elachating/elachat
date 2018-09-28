define(['app'],function(app){
  'use strict';
  app.register.controller('MeRemoveWalletCtrl',[
    '$scope',
    '$rootScope',
    '$stateParams',
    '$location',
    function($scope,$rootScope,$stateParams,$location){
        $scope.remove = function(){
            window.webspvwalletapi.removewallet(function(success){
                //if(success == "1"){
                    navigator.webtoast.showtoast("删除成功！",1);

                //}else{
                //   navigator.webtoast.showtoast("删除失败！",1);
                //}
            },function(error){
                 console.log("错误"+error);
            });
        }
  }]);
});
