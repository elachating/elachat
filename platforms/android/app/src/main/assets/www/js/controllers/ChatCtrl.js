define(['app','services/ChatService'],function(app){
  'use strict';
  app.register.controller('ChatCtrl',[
    '$scope',
    '$state',
    '$rootScope',
    '$stateParams',
    '$location',
    'ChatService',
    '$interval',
    'ngDialog',
    '$cordovaFile',
    '$translate',
    function($scope,$state,$rootScope,$stateParams,$location,ChatService,$interval,ngDialog,$cordovaFile,$translate){
        if(window.localStorage.fulistnick=="undefined" || window.localStorage.fulistnick==undefined){
            var jsonObj = "";
        }else{
            var jsonObj = JSON.parse(window.localStorage.fulistnick);
        }
        if($stateParams.nickname==""){
            window.webcarrierapi.getfriendinfo(function(success){
                  if(jsonObj!=""){
                    var fuid = $stateParams.fuid;
                    $scope.fnickname = jsonObj[fuid];
                  }else{
                    $scope.fnickname = success.nickname;
                  }
                if(success.nickname==$stateParams.fuid){
                   $(".chat-footer").css("padding","0px");
                  $(".submenutop").hide();
                  $("#offline").show();
                }
            },function(error){
            },$stateParams.fuid);
        }else{
            $scope.fnickname = $stateParams.nickname;
        }
        $scope.fuid = $stateParams.fuid;

        $scope.jumpfrienddetail =  function(){
             $interval.cancel(curinterval);
             if($stateParams.nickname==""){
                if($scope.fnickname==$stateParams.fuid){
                    $state.go('frienddetail', {fuid:$stateParams.fuid,nickname:$translate.instant("chat_index_offline")});
                }else{
                    $state.go('frienddetail', {fuid:$stateParams.fuid,nickname:$scope.fnickname});
                }
             }else{
                $state.go('frienddetail', {fuid:$stateParams.fuid,nickname:$stateParams.nickname});
             }
        }
        //var cbutton = document.getElementById("cbutton");
        var showtalktn = document.getElementById("showtalktn");
        var talkbtn = document.getElementById("talkbtn");
        var contents = document.getElementById("contents");
        var submenu = document.getElementById("submenu");
        var send = document.getElementById("send");
        var add = document.getElementById("add");
		var content = document.getElementsByTagName('ul')[0];
		var img = content.getElementsByTagName('img');
        var span = content.getElementsByTagName('span');
        var arrIcon = ['img/boydefault.png','img/boydefault.png'];
        var num = 0;     //控制头像改变
        var iNow = -1;    //用来累加改变左右浮动
		var content = document.getElementsByTagName('ul')[0];
		//建立接收文件
		/*
		window.webcarrierapi.prereceive(function(successfulp){
                console.log("建立接收文件成功："+successfulp);
		},function(errorp){
                console.log("建立接收文件错误："+errorp);
		});
		*/
        window.webdbapi.messagelist(function(suf){
            $scope.chatlist =eval('(' + suf + ')');
        },function(er){
            console.log("错误"+er);
        },$stateParams.fuid);

        var curinterval = $interval(function(){
              ChatService.chatmessage($stateParams.fuid).then(function(success){
                 for(var w=0;w<success.length;w++){
                   content.innerHTML += '<li><img src="img/boydefault.png"  class="imgleft"><span  class="spanleft" style="word-break : break-all;" >'+success[w]['content']+'</span></li>';
                   contents.value = '';
                 }
                 content.scrollTop=content.scrollHeight;
              });
        },3000);
        window.webcarrierapi.myinfo(function(successful){
          $scope.myuid = successful.uid;
                 content.scrollTop=content.scrollHeight;
        },function(error){
            console.log(error);
        },"","");
        $scope.sendinfo = function(){
                send.style.display="none";
                add.style.display="block";
                var message = contents.value;
                if(message ==''){
                    navigator.webtoast.showtoast($translate.instant("chat_index_sendmessage_tip"),1);
                }else {
                    content.innerHTML += '<li><img src="img/boydefault.png"  class="imgright"><span  class="spanright" style="word-break : break-all;" >'+message+'</span></li>';
                    contents.value = '';
                    content.scrollTop=content.scrollHeight;
                    window.webcarrierapi.sendmessage(function(suf){
                            submenu.style.display="none";
                            add.setAttribute("curstatus","0");
                    },function(er){
                        console.log("错误"+er);
                    },$stateParams.fuid,message);

                   window.webdbapi.insertchat(function(sufa){

                   },function(era){

                   },$stateParams.fuid, $scope.myuid,message);
                }
        }
        $scope.addinfo = function(){
             var curstatus  = add.getAttribute("curstatus");
             if(curstatus=="0"){
                submenu.style.display="block";
                add.setAttribute("curstatus","1");
             }else{
                submenu.style.display="none";
                add.setAttribute("curstatus","0");
             }
        };
        $scope.judge = function(){
            if(contents.value!=""){
                send.style.display="block";
                submenu.style.display="none";
                add.style.display="none";
            }else{
                send.style.display="none";
                add.style.display="block";
            }
        };
        /*
        $scope.showtalkbtn = function(){
            var curstatus = showtalktn.getAttribute("curstatus");
            if(curstatus=="1"){
                showtalktn.innerHTML="&#xe612;";
                contents.style.display="none";
                talkbtn.style.display="block";
                showtalktn.setAttribute("curstatus","0");
            }else{
                showtalktn.innerHTML="&#xe68b;";
                contents.style.display="block";
                talkbtn.style.display="none";
                showtalktn.setAttribute("curstatus","1");
            }
        };
        */
        //开始录制
        function recordaudiofuc(){
             //$scope.mediaRec.release();
             $scope.mediaRec = new Media($scope.src,
             function() {
                 console.log("录制成功！");
                 window.webcarrierapi.sendfile(function(suce){
                     console.log("发送成功："+suce);
                 },function(errf){
                     console.log("发送失败："+erre);
                 },"media",$scope.src,"mp3",$scope.fuid);
             },
             function(err) {
                 console.log("recordAudio():Audio Error: "+ err.code);
             });
            $scope.mediaRec.startRecord();
        }
        //结束录制
        function stoprecord(){
            $scope.mediaRec.stopRecord();
        }
        var posStart = 0;//初始化起点坐标
        var posEnd = 0;//初始化终点坐标
        var posMove = 0;//初始化滑动坐标
        initEvent();
            function initEvent() {
                        talkbtn.addEventListener("touchstart", function(event) {
                            event.preventDefault();//阻止浏览器默认行为
                            posStart = 0;
                            posStart = event.touches[0].pageY;//获取起点坐标
                            talkbtn.innerHTML = '松开 结束';

                            var mpfilename = new Date().getTime();
                            $scope.src = cordova.file.externalRootDirectory+"/cloudchat/"+ mpfilename +".mp3";;
                            $cordovaFile.createDir(cordova.file.externalRootDirectory, "cloudchat", false)
                             .then(function (success) {
                             }, function (error) {
                               // error
                             });
                             recordaudiofuc();
                        });
                        talkbtn.addEventListener("touchmove", function(event) {
                            event.preventDefault();//阻止浏览器默认行为
                            posMove = 0;
                            posMove = event.targetTouches[0].pageY;//获取滑动实时坐标
                            if(posStart - posMove < 500){
                                talkbtn.innerHTML = '松开 结束';
                            }else{
                                talkbtn.innerHTML = '松开手指，取消发送';
                                $scope.mediaRec.stopRecord();
                            }
                        });
                        talkbtn.addEventListener("touchend", function(event) {
                            event.preventDefault();
                            posEnd = 0;
                            posEnd = event.changedTouches[0].pageY;//获取终点坐标
                            talkbtn.innerHTML = '按住 说话';
                            if(posStart - posEnd < 500 ){
                                console.log("发送成功");
                                $scope.mediaRec.stopRecord();
                                content.innerHTML += '<li><img src="img/boydefault.png"  class="imgright"><span curaudio="'+ $scope.src +'" class="spanright">&nbsp;&nbsp;</span></li>';
                            }else{
                                console.log("取消发送");
                                console.log("Cancel");
                            };
                        });
                    };
        var filebtn = document.getElementById("filebtn");
        $scope.sendfile = function(){
            filebtn.click();
        };
        filebtn.addEventListener("change",function(){
           navigator.webtoast.showtoast("获取文件路径及名称："+this.value,1);
           var curfileurl = this.value;

            window.webcarrierapi.sendfile(function(sucf){
                console.log("发送成功："+sucf);
            },function(errf){
                console.log("发送失败："+errf);
            },"jpg","",curfileurl,$scope.fuid);

        });
        $scope.sendvideo = function(){
            window.webselfmicrvideo.start(function(successful){
                if(successful!="no"){
                     navigator.webtoast.showtoast("录制的视频文件地址："+successful,1);
                }
            },function(error){
                    navigator.webtoast.showtoast("录制视频错误!",1);
            })
        }
        $scope.sendcoin = function(){
              ChatService.getwalletadr().then(function(success){
                var message = "<img src='img/chatzz.png'  attr='"+success+"' class='sendwalletadr' style='width:50px;height:50px;float:left;' /><div style='float:left;width:120px;height:50px;margin-left:10px;'>收币地址："+success+' </div>';
                content.innerHTML += '<li><img src="img/boydefault.png"  class="imgright"><span  class="spanright" style="word-break : break-all;line-height:20px;" >收币地址：'+success+'</span></li>';
                contents.value = '';
                content.scrollTop=content.scrollHeight;
                  var fuid = $stateParams.fuid;
                  window.webcarrierapi.sendmessage(function(suf){
                    navigator.webtoast.showtoast($translate.instant("chat_index_sendwalletadr_tip"),1);
                    submenu.style.display="none";
                    add.setAttribute("curstatus","0");
                  },function(errora){
                      // deferred.reject(errora);
                  },fuid,message);
                   window.webdbapi.insertchat(function(sufa){

                   },function(era){

                   },fuid, $scope.myuid,success);
              });
          }
        $(document).on("click",".sendwalletadr",function(){
            var toadr = $(this).attr("attr");
            $state.go('wallet_send', {chainidc:"ELA",toadr:toadr});
        })


  }]);
});