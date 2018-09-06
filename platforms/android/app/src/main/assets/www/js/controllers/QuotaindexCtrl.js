define(['app'],function(app){
  'use strict';
  app.register.controller('QuotaindexCtrl',[
    '$scope',
    '$rootScope',
    '$state',
    '$stateParams',
    '$interval',
    '$location',
    function($scope,$rootScope,$state,$stateParams,$interval,$location){
        $scope.showapp = function(){
            navigator.webtoast.showtoast("暂无应用！",1);
        }
      $scope.newmessagelist = function(){
           $location.url("/index");
      }
      $scope.quotadetail = function(maincoin,subcoin){
		  window.clearInterval($scope.quotainterval);
          $state.go('quotadetail', {maincoin:maincoin,subcoin:subcoin});
      }
        $scope.getmyquota = function(curmaincoin,$event){
			$("#quoteschoose div").css("color","#333");
			$("#quoteschoose div").css("background-color","#f5f5f5");
			$($event.target).css("color","#fff");
			$($event.target).css("background-color","#0070c9");
			$(".subcoinlist").hide();
			$("#"+curmaincoin).show();
		  if($scope.quotainterval!=null && $scope.quotainterval!=undefined){
			window.clearInterval($scope.quotainterval);
		  }
			getmarketquota(curmaincoin);
			show(curmaincoin);
        }
		function getmarketquota(topmenu){
			var symbollist = "";
			$("#"+topmenu+" li").each(function(){
				symbollist = symbollist + "|"+ $(this).attr("subcoin")+"_"+$(this).attr("maincoin");
			});
			if(symbollist!="|" && symbollist!=""){
				symbollist= symbollist.substring(1);
			}
			//urla = "http://cloudchat.io/quota/init.php?symbol="+symbollist;
			$scope.quotaurl = "http://cloudchat.io/quota/init.php?symbol="+symbollist;
            $.getJSON($scope.quotaurl, function (data) {
				if(data.status !== "ok") {
						console.log("读取数据失败！");
						//alert('读取数据失败！');
						return false;
				}
				data = data.tick;
				for(var j=0;j<data.length;j++){
					//console.log("#"+data[j]['maincoin']+"_"+data[j]['subcoin']+"_aprice");
					$("#"+data[j]['maincoin']+"_"+data[j]['subcoin']+"_aprice").html(data[j]['aprice']);
					$("#"+data[j]['maincoin']+"_"+data[j]['subcoin']+"_rprice").html("￥"+data[j]['rprice']);
					$("#"+data[j]['maincoin']+"_"+data[j]['subcoin']+"_market").html(data[j]['market']);
					$("#"+data[j]['maincoin']+"_"+data[j]['subcoin']+"_chargerrang").html(data[j]['chargerrang']);
					//console.log(data[j]['subcoin']+" = "+ data[j]['chargerrang'].substring(0,1));
					if(data[j]['chargerrang'].substring(0,1)=="-"){
						$("#"+data[j]['maincoin']+"_"+data[j]['subcoin']+"_chargerrang").css("background-color","#d53942");
					}else{
						$("#"+data[j]['maincoin']+"_"+data[j]['subcoin']+"_chargerrang").css("background-color","#51cf6e");
					}

				}
			})
		}
		show("usdt");
		function show(topmenu){
            $scope.quotainterval = $interval(function(){
                 var symbollist = "";
                $("#"+topmenu+" li").each(function(){
                    symbollist = symbollist + "|"+ $(this).attr("subcoin")+"_"+$(this).attr("maincoin");
                });
                if(symbollist!="|" && symbollist!=""){
                    symbollist= symbollist.substring(1);
                }
                $scope.quotaurl = "http://cloudchat.io/quota/init.php?symbol="+symbollist;
                $.getJSON($scope.quotaurl, function (data) {
                    if(data.status !== "ok") {
                            //console.log("读取数据失败！");
                            //alert('读取数据失败！');
                            return false;
                    }
                    data = data.tick;
                    for(var j=0;j<data.length;j++){
                        //console.log("#"+data[j]['maincoin']+"_"+data[j]['subcoin']+"_aprice");
                        $("#"+data[j]['maincoin']+"_"+data[j]['subcoin']+"_aprice").html(data[j]['aprice']);
                        $("#"+data[j]['maincoin']+"_"+data[j]['subcoin']+"_rprice").html("￥"+data[j]['rprice']);
                        $("#"+data[j]['maincoin']+"_"+data[j]['subcoin']+"_market").html(data[j]['market']);
                        $("#"+data[j]['maincoin']+"_"+data[j]['subcoin']+"_chargerrang").html(data[j]['chargerrang']);
                        //console.log(data[j]['subcoin']+" = "+ data[j]['chargerrang'].substring(0,1));
                        if(data[j]['chargerrang'].substring(0,1)=="-"){
                            $("#"+data[j]['maincoin']+"_"+data[j]['subcoin']+"_chargerrang").css("background-color","#d53942");
                        }else{
                            $("#"+data[j]['maincoin']+"_"+data[j]['subcoin']+"_chargerrang").css("background-color","#51cf6e");
                        }

                    }
                })
            },3000);
        }
    }]);
});
