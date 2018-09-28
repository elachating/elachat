define(['app','services/SpvService'],function(app){
  'use strict';
  app.register.controller('AssetCtrl',[
    '$scope',
    '$state',
    '$rootScope',
    '$stateParams',
    '$location',
    'SpvService',
    '$http',
    'ngDialog',
    function($scope,$state,$rootScope,$stateParams,$location,SpvService,$http,ngDialog){
        $http({
                method: 'GET',
                url: 'https://ela.chat/version/up.json'
            }).then(function successCallback(response) {
                if(AppVersion.build!=response.data){
                       $scope.upred = true;
                }
            }, function errorCallback(response) {
                console.log(response)
            });
        $scope.showapp = function(){
            navigator.webtoast.showtoast("暂无应用！",1);
        }
        $scope.jumpassetdetail =  function(chainid){
          $state.go('wallet_main', {chainida:chainid});
        }
      if (window.localStorage.walletyn === undefined || window.localStorage.walletyn === 'undefined') {
           $location.url('/asset/wallet_init');
      }else{
            SpvService.walletyn().then(function(successful){
                SpvService.walletinfo(successful).then(function(successa){
                    $scope.walletname = successa;
                });
            });
            SpvService.getbalance().then(function(successful){
               var subwallets =  eval('(' + successful + ')');
               $scope.data = eval('(' + successful + ')');
               for(var j=0;j<subwallets.length;j++){
                    if(subwallets[j]['chainid']=="ELA"){
                        $.getJSON('http://ela.chat/quota/op.php?parm=detail&maincoin=usdt&subcoin=ela', function (data) {
                            if(data.status !== "ok") {
                                    return false;
                            }
                            data = data.tick;
                             $("#allsums").html("≈ "+((data.close*6.8) * parseFloat(subwallets[j]['balance'])).toFixed(4)+" CNY<span style='font-size:12px;color:#aaa;'>(huobi)</span>");
                        })
                        break;
                    }
               }
               });
           }
  }]);
});
