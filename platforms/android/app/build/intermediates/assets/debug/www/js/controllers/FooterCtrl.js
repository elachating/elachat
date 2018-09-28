define(['app'],function(app){
  'use strict';
  app.register.controller('FooterCtrl',[
    '$scope',
    '$rootScope',
    '$stateParams',
    '$location',
    function($scope,$rootScope,$stateParams,$location){
      console.log("当前地址："+$location.url());
  }]);
});