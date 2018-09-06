define(['app'],function(app){
  'use strict';
  app.register.controller('MeNewsCtrl',[
    '$scope',
    '$rootScope',
    '$stateParams',
    '$location',
    '$http',
    function($scope,$rootScope,$stateParams,$location,$http){
	$scope.meindexback = function(){
		console.log("跳转！");
        $location.url("/me/index");
	}
    $http({
        method: 'GET',
        url: 'http://121.42.196.42:91/public/index.php/me/news/index?cate=1'
    }).then(function successCallback(response) {
        if(response.data.code == "1"){
            var notice_state_arr;
            var datas = response.data.msg
            var notice_state = localStorage.getItem("notice_state");
            if(notice_state == null){
                notice_state_arr = [];
            }else{
                notice_state_arr = notice_state.split(',');
            }
            for(var i in datas){
                if(notice_state_arr.indexOf(datas[i].id.toString()) == "-1"){
                    datas[i].read = false;
                }else{
                    datas[i].read = true;
                }
            }
            $scope.data = datas;
        }else{
             console.log(response.data.msg)
        }
    }, function errorCallback(response) {
            console.log(response)
    });

    $scope.jumpdetail = function(id){
        var notice_state = localStorage.getItem("notice_state");
        var notice_state_arr;
        if(notice_state == null){
            notice_state_arr = [];
        }else{
            notice_state_arr = notice_state.split(',');
        }
        if(notice_state_arr.indexOf(id.toString()) == "-1"){
            notice_state_arr.push(id);
        }
        localStorage.setItem("notice_state",notice_state_arr);
         $location.url('/me/news_detail?id='+id);
    }
  }]);
});
