cordova.define("cordova-plugin-spvwalletapi.SpvwalletapiPlugin",
    function(require, exports, module) {
        var exec = require("cordova/exec");
        module.exports = {
            creatememwords: function(success,error,language){
                exec(
                    success,
                    error,
                "SpvwalletapiPlugin",//feature name
                "creatememwords",//action
                [language]//要传递的参数，json格式
                );
            },
            getallmasterwallet: function(success,error){
                exec(
                    success,
                    error,
                "SpvwalletapiPlugin",//feature name
                "getallmasterwallet",//action
                []//要传递的参数，json格式
                );
            },
            createmasterwallet: function(success,error,walletid,mnemonic,phrasePassword, payPassword, language){
                exec(
                    success,
                    error,
                "SpvwalletapiPlugin",//feature name
                "createmasterwallet",//action
                [walletid,mnemonic,phrasePassword, payPassword, language]//要传递的参数，json格式
                );
            },
            walletinfo: function(success,error){
                exec(
                    success,
                    error,
                "SpvwalletapiPlugin",//feature name
                "walletinfo",//action
                []//要传递的参数，json格式
                );
            },
            subwalletlist: function(success,error){
                exec(
                    success,
                    error,
                "SpvwalletapiPlugin",//feature name
                "subwalletlist",//action
                []//要传递的参数，json格式
                );
            },
            addresslist: function(success,error,chainid){
                exec(
                    success,
                    error,
                "SpvwalletapiPlugin",//feature name
                "getaddress",//action
                [chainid]//要传递的参数，json格式
                );
            },
            changepaypassword: function(success,error,oldpassword,newpassword){
                exec(
                    success,
                    error,
                "SpvwalletapiPlugin",//feature name
                "changepaypassword",//action
                [oldpassword,newpassword]//要传递的参数，json格式
                );
            },
            exportwalletmo: function(success,error,armpassword){
                exec(
                    success,
                    error,
                "SpvwalletapiPlugin",//feature name
                "exportwalletwithmnemonic",//action
                [armpassword]//要传递的参数，json格式
                );
            },
            exportwalletpkey: function(success,error,armpassword,paypassword){
                exec(
                    success,
                    error,
                "SpvwalletapiPlugin",//feature name
                "exportwalletwithkeystore",//action
                [armpassword,paypassword]//要传递的参数，json格式
                );
            },
            alltractionlist: function(success,error,chainid){
                exec(
                    success,
                    error,
                "SpvwalletapiPlugin",//feature name
                "getalltractionlist",//action
                [chainid]//要传递的参数，json格式
                );
            },
            getfee: function(success,error,chainid,fromaddress,toaddress,amount,mono){
                exec(
                    success,
                    error,
                "SpvwalletapiPlugin",//feature name
                "getfee",//action
                [chainid,fromaddress,toaddress,amount,mono]//要传递的参数，json格式
                );
            },
            sendcoin: function(success,error,chainid,paypassword,fromaddress,toaddress,amount,mono){
                exec(
                    success,
                    error,
                "SpvwalletapiPlugin",//feature name
                "sendcoin",//action
                [chainid,paypassword,fromaddress,toaddress,amount,mono]//要传递的参数，json格式
                );
            },
            trandetail: function(success,error,chainid,txid,noid){
                exec(
                    success,
                    error,
                "SpvwalletapiPlugin",//feature name
                "gettractioninfo",//action
                [chainid,txid,noid]//要传递的参数，json格式
                );
            },
            listentrans: function(success,error){
                exec(
                    success,
                    error,
                "SpvwalletapiPlugin",//feature name
                "listentransaction",//action
                []//要传递的参数，json格式
                );
            },
            judgewalletadr: function(success,error,adr){
                exec(
                    success,
                    error,
                "SpvwalletapiPlugin",//feature name
                "judgewalletadr",//action
                [adr]//要传递的参数，json格式
                );
            },
            getbalance: function(success,error,chainid){
                exec(
                    success,
                    error,
                "SpvwalletapiPlugin",//feature name
                "getbalance",//action
                [chainid]//要传递的参数，json格式
                );
            },
            removewallet: function(success,error){
                exec(
                    success,
                    error,
                "SpvwalletapiPlugin",//feature name
                "removewallet",//action
                []//要传递的参数，json格式
                );
            },
            importmono: function(success,error,chainid,contents,phrasePassword,paypassword,lang){
                exec(
                    success,
                    error,
                "SpvwalletapiPlugin",//feature name
                "importwalletwithmnemonic",//action
                [chainid,contents,phrasePassword,paypassword,lang]//要传递的参数，json格式
                );
            },
            importkeyfile: function(success,error,chainid,contents,backuppassword,paypassword,phrarsepassword){
                exec(
                    success,
                    error,
                "SpvwalletapiPlugin",//feature name
                "importwalletwithkeystore",//action
                [chainid,contents,backuppassword,paypassword,phrarsepassword]//要传递的参数，json格式
                );
            },
        };
});