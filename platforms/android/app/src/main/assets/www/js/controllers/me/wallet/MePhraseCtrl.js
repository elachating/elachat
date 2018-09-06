define(['app'],function(app){
  'use strict';
  app.register.controller('MePhraseCtrl',[
    '$scope',
    '$rootScope',
    '$stateParams',
    '$location',
    '$translate',
    function($scope,$rootScope,$stateParams,$location,$translate){
        $scope.words = $location.search().phrase;
        $scope.walletindexphraseback =  function(){
            $location.url('/me/wallet/index');
        }
  }]);
});
