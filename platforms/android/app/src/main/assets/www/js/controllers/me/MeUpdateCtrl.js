define(['app'],function(app){
  'use strict';
  app.register.controller('MeUpdateCtrl',[
    '$scope',
    '$rootScope',
    '$stateParams',
    '$location',
    '$http',
    'ngDialog',
    '$translate',
    function($scope,$rootScope,$stateParams,$location,$http,ngDialog,$translate){
        $scope.meindexback_update =  function(){
          $location.url('/me/index');
        }
        $http({
                method: 'GET',
                url: 'https://ela.chat/version/up.json'
            }).then(function successCallback(response) {
                console.log("当前版本"+AppVersion.build);
                console.log("升级版本"+response.data);
                if(AppVersion.build!=response.data){
                       $scope.upred = true;
                }
            }, function errorCallback(response) {
                console.log(response)
            });
        $scope.checknew = function(){
             window.AppUpdate.checkAppUpdate(function(r){
                if(r.msg=="success, up to date."){
			        //navigator.webtoast.showtoast("已经是最新版本！",1);
			        ngDialog.open({
                     template: '<div style="width:100%;height:30px;border-bottom:1px solid #e5e5e5;><h4 class="modal-title">'+$translate.instant("me_update_index_dialog_title")+'</h4></div>' +
                               '<div class="modal-body" style="width:100%;height:100px;color:#444;line-height:100px;text-align:center;font-weight:800;font-size:20px;">&nbsp;'+ $translate.instant("me_update_index_dialog_content") +'</div>'+
                               '<div class="modal-footer" style="width:80%;height:60px;margin-left:10%;padding-top:10px;padding-bottom:20px;">'+
                               '<button type="button" style="font-size:14px;border:0px;border-radius:3px;width:80%;margin-left:10%;height:40px;line-height:40px;background-color:#0070c9;color:#fff;text-align:center;" class="btn" ng-click="confirm()" >'+ $translate.instant("me_update_index_dialog_btn") +'/button></div>',
                    plain:true,
                             className: 'ngdialog-theme-default',
                             width:'80%',
                             scope: $scope,
                             controller: function ($scope) {
                                 $scope.confirm = function () {
                                        $scope.closeThisDialog();
                                 };
                             }
                    });
                }
             }, function(e){console.log("这是E："+e)}, "https://ela.chat/version/v.xml");
        }
  }]);
});