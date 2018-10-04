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
          if (window.localStorage.lang === undefined || window.localStorage.lang === 'undefined') {
                var url = "http://121.42.196.42:91/public/index.php/me/news/detail?id=17";
            }else{
                if(window.localStorage.lang=="cn"){
                    var url = "http://121.42.196.42:91/public/index.php/me/news/detail?id=10";
                }else{
                    var url = "http://121.42.196.42:91/public/index.php/me/news/detail?id=17";
                }
            }
           $http({
               method: 'GET',
               url: url
           }).then(function successCallback(response) {
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
