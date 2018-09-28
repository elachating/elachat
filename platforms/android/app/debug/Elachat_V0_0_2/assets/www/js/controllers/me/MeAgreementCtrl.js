define(['app'],function(app){
  'use strict';
  app.register.controller('MeAgreementCtrl',[
    '$scope',
    '$rootScope',
    '$stateParams',
    '$location',
    '$http',
    '$translate',
    function($scope,$rootScope,$stateParams,$location,$http,$translate){
           $scope.meindexback_agree = function(){
                $location.url("/me/index");
           }
           $http({
               method: 'GET',
               url: 'http://121.42.196.42:91/public/index.php/me/news/detail?id=10'
           }).then(function successCallback(response) {
               console.log("打印："+response.data.msg);
               if(response.data.code == "1"){
                   $scope.data = response.data.msg;
               }else{
                   console.log(response.data.msg)
               }
           }, function errorCallback(response) {
                   console.log(response)
           });
  }]);
});
