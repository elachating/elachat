cordova.define("cordova-plugin-selfscan.SelfscanPlugin",
    function(require, exports, module) {
        var exec = require("cordova/exec");
        module.exports = {
            scan: function(success,error){
                exec(
                    success,
                    error,
                "SelfscanPlugin",//feature name
                "scan",//action
                []
                );
            }
        }
});