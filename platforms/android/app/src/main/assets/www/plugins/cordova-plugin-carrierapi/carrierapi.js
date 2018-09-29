cordova.define("cordova-plugin-carrierapi.CarrierapiPlugin",
    function(require, exports, module) {
        var exec = require("cordova/exec");
        module.exports = {
            myinfo: function(success,error,parma,parmb){
                exec(
                    success,
                    error,
                "CarrierapiPlugin",//feature name
                "getmyinfo",//action
                [parma,parmb]//要传递的参数，json格式
                );
            },
            setmyinfo:function(success,error,nickname,email,headimg){
                exec(
                    success,
                    error,
                "CarrierapiPlugin",//feature name
                "setmyinfo",//action
                [nickname,email,headimg]//要传递的参数，json格式
                );
            },
            joinfriend:function(success,error,faddress,hellomessage){
                exec(
                    success,
                    error,
                "CarrierapiPlugin",//feature name
                "joinfriend",//action
                [faddress,hellomessage]//要传递的参数，json格式
                );
            },
            acceptfriend:function(success,error,fuid){
                exec(
                    success,
                    error,
                "CarrierapiPlugin",//feature name
                "acceptfriend",//action
                [fuid]//要传递的参数，json格式
                );
            },
            friendlist:function(success,error){
                exec(
                    success,
                    error,
                "CarrierapiPlugin",//feature name
                "friendlist",//action
                []//要传递的参数，json格式
                );
            },
            removefriend:function(success,error,fuid){
                exec(
                    success,
                    error,
                "CarrierapiPlugin",//feature name
                "removefriend",//action
                [fuid]//要传递的参数，json格式
                );
            },
            sendmessage:function(success,error,fuid,msg){
                exec(
                    success,
                    error,
                "CarrierapiPlugin",//feature name
                "sendmessage",//action
                [fuid,msg]//要传递的参数，json格式
                );
            },
             prereceive:function(success,error){
                 exec(
                     success,
                     error,
                 "CarrierapiPlugin",//feature name
                 "prereceive",//action
                 []//要传递的参数，json格式
                 );
             },
             getfriendlist:function(success,error){
                   exec(
                       success,
                       error,
                   "CarrierapiPlugin",//feature name
                   "getfriendlist",//action
                   []//要传递的参数，json格式
                   );
             },
             sendfile:function(success,error,facate,fdir,exten,fuid){
                   exec(
                       success,
                       error,
                   "CarrierapiPlugin",//feature name
                   "sendfile",//action
                   [facate,fdir,exten,fuid]//要传递的参数，json格式
                   );
             },
               getfriendinfo:function(success,error,userId){
                      exec(
                         success,
                         error,
                     "CarrierapiPlugin",//feature name
                     "getfriendinfo",//action
                     [userId]//要传递的参数，json格式
                     );
               }
        }
});