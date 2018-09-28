define(['app'],function(app){
  'use strict';
      app.register.controller('WalletphrasenextCtrl',[
    '$scope',
    '$rootScope',
    '$stateParams',
    '$location',
    function($scope,$rootScope,$stateParams,$location){
        $scope.closebtn = function(){
            $location.url("/asset/wallet_create");
        }
        //短语生成指定的span标签格式
        console.log("助记词："+window.localStorage.mnemonicone);
        var phrasearra = window.localStorage.mnemonicone.split(" ");
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
            spanhtml = spanhtml+"<div class='phraseword' style='font-size:14px;padding-left:3px;padding-top:5px;float:left;width:60px;height:30px;line-height:30px;'>"+ phrasearr[i] +"</div>";
        }
        $("#optionphrase").html(spanhtml);
        $(document).off("click",".phraseword").on("click",".phraseword",function(){
        //$(".phraseword").off("click").on("click",function(){
        //$(".phraseword").on("click",function(){
        //$(document).on("click",".phraseword",function(){
           console.log("点击我了");
           var optionshow = $("#optionshow").html();
           if($(this).html()==phrasearra[counta]){
                $("#optionshow").html(optionshow+"<div class='phraseshow' style='padding-left:3px;padding-top:5px;font-size:14px;float:left;width:60px;height:30px;line-height:30px;'>"+$(this).html()+"</div>");
                counta = counta + 1;
           }else{
                $("#optionshow").html(optionshow+"<div class='phraseshow' style='padding-left:3px;padding-top:5px;font-size:14px;float:left;width:60px;height:30px;line-height:30px;'>"+$(this).html()+"</div>");
           }
           $(this).remove();
        })
        $(document).off("click",".phraseshow").on("click",".phraseshow",function(){
       // $(".phraseshow").off("click").on("click",function(){
       // $(document).on("click",".phraseshow",function(){
           console.log("点击我了！！！！");
           var optionphrase = $("#optionphrase").html();
           $("#optionphrase").html(optionphrase+"<div class='phraseword' style='padding-left:3px;padding-top:5px;font-size:14px;float:left;width:60px;height:30px;line-height:30px;'>"+$(this).html()+"</div>");
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
                    },window.localStorage.walletname,window.localStorage.mnemonicone,window.localStorage.wordpwd, window.localStorage.paypwd, "english");
                    $location.url('/asset');
                }else{
                    navigator.webtoast.showtoast("确认的助记词不正确！",1);
                }
        }
  }]);
});
