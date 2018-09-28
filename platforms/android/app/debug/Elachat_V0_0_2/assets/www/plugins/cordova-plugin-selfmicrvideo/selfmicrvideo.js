cordova.define("cordova-plugin-selfmicrvideo.SelfmicrvideoPlugin",
    function(require, exports, module) {
        var exec = require("cordova/exec");
        module.exports = {
            start: function(success,error){
                exec(
                    success,
                    error,
                "SelfmicrvideoPlugin",//feature name
                "start",//action
                []
                );
            }
        }
});