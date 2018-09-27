define(['app'],function(app){
  'use strict';
  app.register.controller('QuotadetailCtrl',[
    '$scope',
    '$rootScope',
    '$stateParams',
    '$state',
    '$interval',
    '$location',
    '$translate',
    function($scope,$rootScope,$stateParams,$state,$interval,$location,$translate){
            $scope.quotamaincoin = $stateParams.maincoin;
            $scope.quotasubcoin = $stateParams.subcoin;
            $scope.curcoins = $stateParams.subcoin.toUpperCase();
            $scope.curcoin = $stateParams.subcoin.toUpperCase();
            $scope.paramurl = '&maincoin='+$stateParams.maincoin+'&subcoin='+$stateParams.subcoin;
            $scope.quotadetailurl = 'http://ela.chat/quota/op.php?parm=detail'+ $scope.paramurl;
            $scope.jumpquotaindex = function(){
                 $location.url("/quotaindex");
            }
            $.getJSON( $scope.quotadetailurl, function (data) {
            if(data.status !== "ok") {
                    //alert('读取数据失败！');
                    console.log('读取数据失败！');
                    return false;
            }
            data = data.tick;
            $("#highprice").html(data.high);
            $("#lowprice").html(data.low);
            if(Math.floor(data.amount/1000)>1){
                var amount = Math.floor(data.amount/1000)+"."+Math.floor(data.amount%1000)+"K";
            }else{
                var amount = data.amount;
            }
            $("#dealamount").html(amount);
            var pernum = Math.floor((((data.close-data.open)/data.open)*100)*100)/100;
            $("#pricecharge").html(pernum+"%");
            $("#aprice").html(data.close);
            $("#rprice").html("￥ "+(data.close*6.92).toFixed(4));
            $("#chargerrang").html(pernum+"%");
            if(pernum>0){
                $("#chargerrang").css("background-color","#51cf6e");
            }else{
                $("#chargerrang").css("background-color","#ae4e54");
            }

            })
            //获取每隔十五分钟时间的时间输出
            function  getpermin(){
                var permin = [];
                var date1 = new Date();
                var time1 = Date.parse(date1);
                    date1.setDate(date1.getDate()-1);
                    date1.setUTCHours('-8','0','0');
                var time2 = Date.parse(date1);
                var ok = 1;
                while(ok<7){
                    time1 = time1 - 1000*60*15;
                var date2 = new Date(time1)
                    permin.push ([
                            date2.getHours()+':'+date2.getMinutes()
                    ]);
                    ok = ok +1;
                }
                return permin.reverse();
            }
            //当前时间每隔一小时输出
            function  getperhour(){
                var perhour = [];
                var date1 = new Date();
                var time1 = Date.parse(date1);
                    date1.setDate(date1.getDate()-1);
                    date1.setUTCHours('-8','0','0');
                var time2 = Date.parse(date1);
                var ok = 1;
                while(ok<7){
                var time1 = time1 - 1000*60*60;
                var date2 = new Date(time1)
                    perhour.push ([
                            date2.getHours()+":00"
                    ]);
                    ok = ok +1;
                }
                return perhour.reverse();
            }
            //当前时间每隔一周
            function  getperweek(){
                var perweek = [];
                var date1 = new Date();
                var time1 = Date.parse(date1);
                    date1.setDate(date1.getDate()-24);
                    date1.setUTCHours('-8','0','0');
                var time2 = Date.parse(date1);
                var ok = 1;
                while(ok<7){
                    time1 = time1 - 1000*60*60*24;
                var date2 = new Date(time1)
                    perweek.push ([
                            (date2.getMonth()+1)+"-"+date2.getDay()
                    ]);
                    ok = ok +1;
                }
                return perweek.reverse();
            }
        show("1");
        $scope.showtime = function(a){
            show(a);
        }
        function show(a){
            $("button").css("background-color","#f5f5f5");
                $("button").css("color","#222");
            if(a=="1"){
                $("#fifteenmin").css("background-color","#fff");
                $("#fifteenmin").css("color","#0070c9");
                //url = 'https://api.huobipro.com/market/history/kline?period=15min&size=6&symbol=elausdt&AccessKeyId=84feea99-fab3f46a-a15cc86f-fc178';
                //url = 'http://ela.chat/quota/15min.json';
                $scope.quotadetailsuburl = 'http://ela.chat/quota/op.php?parm=min'+$scope.paramurl;;
             var cate = getpermin();
            }else if(a=="2"){
                $("#onehour").css("background-color","#fff");
                $("#onehour").css("color","#0070c9");
                //url = 'https://api.huobipro.com/market/history/kline?period=60min&size=6&symbol=elausdt&AccessKeyId=84feea99-fab3f46a-a15cc86f-fc178';
                //url = 'http://ela.chat/quota/day.json';
                $scope.quotadetailsuburl = 'http://ela.chat/quota/op.php?parm=day'+$scope.paramurl;;
            var cate = getperhour();
            }else if(a=="3"){
                $("#oneweek").css("background-color","#fff");
                $("#oneweek").css("color","#0070c9");
                //url = 'https://api.huobipro.com/market/history/kline?period=1week&size=6&symbol=elausdt&AccessKeyId=84feea99-fab3f46a-a15cc86f-fc178';
                //url = 'http://ela.chat/quota/week.json';
                $scope.quotadetailsuburl = 'http://ela.chat/quota/op.php?parm=week'+$scope.paramurl;;
                cate = getperweek();
            }else if(a=="4"){
                $("#onemon").css("background-color","#fff");
                $("#onemon").css("color","#0070c9");
                //url = 'https://api.huobipro.com/market/history/kline?period=1mon&size=6&symbol=elausdt&AccessKeyId=84feea99-fab3f46a-a15cc86f-fc178';
                //url = 'http://ela.chat/quota/month.json';
                $scope.quotadetailsuburl = 'http://ela.chat/quota/op.php?parm=month'+$scope.paramurl;;
            var cate = ['2018-02','2018-03','2018-04','2018-05','2018-06','2018-07'];
                //cate = catea.reverse();
            }else if(a=="5"){
                $("#oneyear").css("background-color","#fff");
                $("#oneyear").css("color","#0070c9");
                //url = 'https://api.huobipro.com/market/history/kline?period=1year&size=6&symbol=elausdt&AccessKeyId=84feea99-fab3f46a-a15cc86f-fc178';
                //url = 'http://ela.chat/quota/year.json';
                $scope.quotadetailsuburl = 'http://ela.chat/quota/op.php?parm=year'+$scope.paramurl;;
            var cate = ['2018'];
            }else{
                $("#fifteenmin").css("background-color","#fff");
                $("#fifteenmin").css("color","#0070c9");
                //url = 'https://api.huobipro.com/market/history/kline?period=15min&size=6&symbol=elausdt&AccessKeyId=84feea99-fab3f46a-a15cc86f-fc178';
                //url = 'http://ela.chat/quota/year.json';
                $scope.quotadetailsuburl = 'http://ela.chat/quota/op.php?parm=min'+$scope.paramurl;;
             var cate = ['2018'];
            }
            try {
            $.getJSON($scope.quotadetailsuburl, function (data) {
            if(data.status !== "ok") {
                    alert('读取数据失败！');
                    return false;
            }
            data = data.data;
            var ohlc = [],
            volume = [],
            dataLength = data.length;
            var i=0;
            for (i; i < dataLength; i += 1) {

                    if(Math.floor(data[i]['amount']/1000)>1){
                        var amount = Math.floor(data[i]['amount']/1000)+"."+Math.floor(data[i]['amount']%1000)+"K";
                    }else{
                        var amount = data[i]['amount'];
                    }
                    ohlc.push([
                            data[i]['amount'], // the date
                    ]);
                    volume.push([
                            data[i]['high'], // the vol
                    ]);
            }
            var chart = Highcharts.chart('container', {
                credits:{
                     enabled: false // 禁用版权信息
                },
                chart: {
                    zoomType: 'xy'
                },
                title: {
                    text: ''
                },
                subtitle: {
                    text: ''
                },
                xAxis: [{
                    categories: cate,
                    crosshair: true,
                    labels: {
                        style: {
                            //color: Highcharts.getOptions().colors[1]
                            'fontSize':'10px'
                        }
                    }
                }],
                yAxis: [{
                    labels: {
                        format: '{value}(usdt)',
                        style: {
                            color: Highcharts.getOptions().colors[1]
                        }
                    },
                    title: {
                        text: '',
                        style: {
                            color: Highcharts.getOptions().colors[1]
                        }
                    }
                }, {
                    title: {
                        text: '',
                        style: {
                            color: Highcharts.getOptions().colors[0]
                        }
                    },
                    labels: {
                        //format: '{value}(K)',
                        formatter:function (){
                            return this.value/1000 + 'K(枚)' ;
                        },
                        style: {
                            color: Highcharts.getOptions().colors[0]
                        }
                    },
                    opposite: true
                }],
                tooltip: {
                    shared: true
                },
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    x: 0,
                    verticalAlign: 'bottom',
                    y: 0,
                    floating: false,
                    backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
                },
                series: [{
                    name: '成交量',
                    type: 'column',
                    yAxis: 1,
                    data: ohlc.reverse(),
                    tooltip: {
                        valueSuffix: ' 枚'
                    }
                }, {
                    name: '币价',
                    type: 'spline',
                    data: volume,
                    tooltip: {
                        valueSuffix: 'USDT'
                    }
                }]
            });
            });
            } catch (error) {
                console.log("访问网页错误提示："+error.message);
            }
        }


    }]);
});
