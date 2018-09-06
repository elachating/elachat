angular.module('starter.services', [])
  .factory('service', [
    '$q',
    function($q) {
      var config = function($rootScope){
        $rootScope.commontip = {
          "EN":{"tabone":"message","tabtow":"quota","tabthree":"dappps","tabfour":"asset","tabfive":"me"},
          "CN":{"tabone":"消息","tabtow":"行情","tabthree":"应用","tabfour":"资产","tabfive":"我的"}
        };
        $rootScope.chatindex = {
          "EN":{"title":"recently message"},
          "CN":{"title":"最新消息"}
        };
      }
      return {
      };
    }]);