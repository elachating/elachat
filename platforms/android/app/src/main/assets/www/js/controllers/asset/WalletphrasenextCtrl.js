define(['app'],function(app){
  'use strict';
      app.register.controller('WalletphrasenextCtrl',[
    '$scope',
    '$rootScope',
    '$stateParams',
    '$location',
    function($scope,$rootScope,$stateParams,$location){
        //短语生成指定的span标签格式
        var phrasearra = window.localStorage.mnemonicone.split(" ");
           console.log("所有存储的值;"+ window.localStorage.mnemonicone);
           console.log("存储的第1个值;"+ phrasearra[0]);
           console.log("存储的第2个值;"+ phrasearra[1]);
           console.log("存储的第3个值;"+ phrasearra[2]);
        var spanhtml = "";

        function shuffle(a) {
           var len = a.length;
           for(var i=0;i<len;i++){
               var end = len - 1 ;
               var index = (Math.random()*(end + 1)) >> 0;
               var t = a[end];
               a[end] = a[index];
               a[index] = t;
           }
           return a;
       };
        var counta = 0;
        var phrasearr = shuffle(phrasearra);
        for(var i=0;i<phrasearr.length;i++){
            spanhtml = spanhtml+"<div class='phraseword' style='font-size:30px;padding-left:7px;padding-top:7px;float:left;width:40px;height:30px;line-height:30px;'>"+ phrasearr[i] +"</div>";
        }
        $("#optionphrase").html(spanhtml);
        //$(document).off("click").on("click",".phraseword",function(){
        $(".phraseword").off("click").on("click",function(){
           var optionshow = $("#optionshow").html();
           console.log("点击次数1："+counta);
           console.log("获取的值："+  $(this).html()+" 存储的值;"+ phrasearra[counta]);
           console.log("点击次数1-2："+phrasearra[counta]);
           console.log("点击次数2："+counta);
           if($(this).html()==phrasearra[counta]){
                $("#optionshow").html(optionshow+"<div class='phraseshow' style='padding-left:7px;padding-top:7px;font-size:30px;float:left;width:40px;height:30px;line-height:30px;'>"+$(this).html()+"</div>");
                counta = counta + 1;
           }else{
                $("#optionshow").html(optionshow+"<div class='phraseshow' style='padding-left:7px;padding-top:7px;font-size:30px;float:left;width:40px;height:30px;line-height:30px;'>"+$(this).html()+"</div>");
           }
           $(this).remove();
        })
        $(".phraseshow").off("click").on("click",function(){
           var optionphrase = $("#optionphrase").html();
           $("#optionphrase").html(optionphrase+"<div class='phraseword' style='padding-left:7px;padding-top:7px;font-size:30px;float:left;width:40px;height:30px;line-height:30px;'>"+$(this).html()+"</div>");
            $(this).remove();
        })
        $scope.jumpcreatwalletsuccess =  function(){
                var choicelist = "";
                $(".phraseshow").each(function(){
                    choicelist = choicelist+""+$(this).html();
                });
                var mnemoniconelist = window.localStorage.mnemonicone;
                if(choicelist==mnemoniconelist.replace(/\s*/g,"")){
                    window.webspvwalletapi.createmasterwallet(function(success){
                        window.localStorage.removeItem("walletname");
                        window.localStorage.removeItem("mnemonicone");
                        window.localStorage.removeItem("wordpwd");
                        window.localStorage.removeItem("paypwd");
                        navigator.webtoast.showtoast("创建成功！",1);
                    },function(error){
                        navigator.webtoast.showtoast("创建钱包失败错误！",1);
                    },window.localStorage.walletname,window.localStorage.mnemonicone,window.localStorage.wordpwd, window.localStorage.paypwd, "chinese");
                    $location.url('/asset');
                }else{
                    navigator.webtoast.showtoast("确认的助记词不正确！",1);
                }
        }
  }]);
});
