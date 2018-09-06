cordova.define("cordova-plugin-chatdb.DbapiPlugin",
    function(require, exports, module) {
        var exec = require("cordova/exec");
        module.exports = {
            newfriendlist: function(success,error){
                exec(
                    success,
                    error,
                "DbapiPlugin",//feature name
                "newfriendlist",//action
                []//要传递的参数，json格式
                );
            },
            updatefriend: function(success,error,uid){
                exec(
                    success,
                    error,
                "DbapiPlugin",//feature name
                "updatenewfriend",//action
                [uid]//要传递的参数，json格式
                );
            },
             friendlist: function(success,error,uid){
                 exec(
                     success,
                     error,
                 "DbapiPlugin",//feature name
                 "friendlist",//action
                 [uid]//要传递的参数，json格式
                 );
             },
             messagelist: function(success,error,uid){
               exec(
                   success,
                   error,
               "DbapiPlugin",//feature name
               "newchatlist",//action
               [uid]//要传递的参数，json格式
               );
              },
             newmessagelist: function(success,error,uid){
               exec(
                   success,
                   error,
               "DbapiPlugin",//feature name
               "nchatlist",//action
               [uid]//要传递的参数，json格式
               );
              },
            insertchat: function(success,error,fuid,myuid,contents){
              exec(
                  success,
                  error,
              "DbapiPlugin",//feature name
              "insertchat",//action
              [fuid,myuid,contents]//要传递的参数，json格式
              );
             },
           newmessage:function(success,error,myuid){
            exec(
                success,
                error,
            "DbapiPlugin",//feature name
            "newmessage",//action
            [myuid]//要传递的参数，json格式
            );
           }
        }
});