cordova.define("cordova-plugin-stoastapi.StoastapiPlugin",
    function(require, exports, module) {
        var exec = require("cordova/exec");
        module.exports = {
            showtoast: function(text,cate){
                exec(
                    null,
                    null,
                "StoastapiPlugin",//feature name
                "showtoast",//action
                [text,cate]//要传递的参数，json格式
                );
            },
            judgestorage: function(){
                exec(
                    null,
                    null,
                "StoastapiPlugin",//feature name
                "judgestorage",//action
                []//要传递的参数，json格式
                );
            }
        };
});