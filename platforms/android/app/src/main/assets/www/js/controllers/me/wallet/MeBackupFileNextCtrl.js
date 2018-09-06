define(['app'],function(app){
  'use strict';
  app.register.controller('MeBackupFileNextCtrl',[
    '$scope',
    '$rootScope',
    '$stateParams',
    '$location',
    '$state',
    '$translate',
    function($scope,$rootScope,$stateParams,$location,$state,$translate){
        $scope.walletindexback =  function(){
            $location.url('/me/wallet/index');
        }
        $scope.file = $location.search().file;
        $scope.copytxt = function(){
            var input = document.createElement("input");
            input.value = $location.search().file;
            document.body.appendChild(input);
            input.select();
            input.setSelectionRange(0, input.value.length), document.execCommand('Copy');
            document.body.removeChild(input);
            navigator.webtoast.showtoast("复制成功！",1);
        }
  }]);
});
