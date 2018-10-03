define([
  'services/services'
],
function(){
'use strict';
var app = angular.module('starter',[
  'ui.router',
  'ngCordova',
  'monospaced.qrcode',
  'starter.services',
  'ngDialog',
  'pascalprecht.translate'
]);
app.filter(
  'to_trusted', ['$sce', function ($sce) {
    return function (text) {
      return $sce.trustAsHtml(text);
    }
  }]
);
app.directive("compileBindExpn", function ($compile) {
    return function linkFn(scope, elem, attrs) {
        scope.$watch("::"+attrs.compileBindExpn, function (html) {
            if (html && html.indexOf("<") != -1 && html.indexOf(">") != -1) {
                var expnLinker = $compile(html);
                expnLinker(scope, function transclude (clone) {
                    elem.empty();
                    elem.append(clone);
                });
            } else {
                elem.empty();
                elem.append(html);
            }
        })
    }
});
app.config(function ($translateProvider) {
 //var lang = window.localStorage.lang||'en';
 //$translateProvider.preferredLanguage(lang);

 if (window.localStorage.lang === undefined || window.localStorage.lang === 'undefined') {
        $translateProvider.preferredLanguage('en');
    } else {
        $translateProvider.preferredLanguage(window.localStorage.lang);
    }
$translateProvider.useStaticFilesLoader({
    files: [{
        prefix: 'i18n/',
        suffix: '.json'
    }]
  });
});
app.config(function(
  $stateProvider,
  $urlRouterProvider,
  $controllerProvider,
  $compileProvider,
  $filterProvider,
  $translateProvider,
  $provide ) {
  app.register = {
    controller : $controllerProvider.register,
    directive: $compileProvider.directive,
    filter: $filterProvider.register,
    service: $provide.service
  }
  app.filter("trusted", function ($sce) {
      return function (html) {
          if (typeof html == "string") {
              return $sce.trustAsHtml(html);
          }
          return html;
      }
  });
  app.loadControllerJs = function(controllerJs){
    return function($rootScope,$q){
      var def = $q.defer(),deps=[];
      angular.isArray(controllerJs) ? (deps = controllerJs) : deps.push(controllerJs);
      require(deps,function(){
        $rootScope.$apply(function(){
          def.resolve();
        });
      });
      return def.promise;
    };
  }
  $urlRouterProvider.otherwise('/');
  $stateProvider.state('index', {
    url: "/",
    templateUrl: "template/index.html",
    cache:true,
    controller: "IndexCtrl",
    resolve: {
          deps:app.loadControllerJs('./controllers/IndexCtrl')
    }
  });
  $stateProvider.state('indexs', {
    url: "/indexs",
    templateUrl: "template/indexs.html",
    cache:true,
    controller: "IndexsCtrl",
    resolve: {
          deps:app.loadControllerJs('./controllers/IndexsCtrl')
    }
  });
  $stateProvider.state('addfriend', {
    url: "/addfriend",
    templateUrl: "template/addfriend.html",
    controller: "AddfriendCtrl",
    resolve: {
          deps:app.loadControllerJs('./controllers/AddfriendCtrl')
    }
  });
  $stateProvider.state('friendlist', {
    url: "/friendlist",
    templateUrl: "template/friendlist.html",
    controller: "FriendlistCtrl",
    resolve: {
          deps:app.loadControllerJs('./controllers/FriendlistCtrl')
    }
  });
  $stateProvider.state('frienddetail', {
    url: "/frienddetail",
    templateUrl: "template/frienddetail.html",
    params:{fuid:"",nickname:""},
    controller: "FrienddetailCtrl",
    resolve: {
          deps:app.loadControllerJs('./controllers/FrienddetailCtrl')
    }
  });
  $stateProvider.state('selfdetail', {
    url: "/selfdetail",
    templateUrl: "template/selfdetail.html",
    controller: "SelfdetailCtrl",
    resolve: {
          deps:app.loadControllerJs('./controllers/SelfdetailCtrl')
    }
  });
  $stateProvider.state('chat', {
    url: "/chat",
    templateUrl: "template/chat.html",
    params:{fuid:"",nickname:""},
    controller: "ChatCtrl",
    resolve: {
          deps:app.loadControllerJs('./controllers/ChatCtrl')
    }
  });
  $stateProvider.state('newfriendlist', {
    url: "/newfriendlist",
    templateUrl: "template/newfriendlist.html",
    controller: "NewfriendlistCtrl",
    resolve: {
          deps:app.loadControllerJs('./controllers/NewfriendlistCtrl')
    }
  });
  $stateProvider.state('quota', {
    url: "/quotaindex",
    templateUrl: "template/quotaindex.html",
    controller: "QuotaindexCtrl",
    resolve: {
          deps:app.loadControllerJs('./controllers/QuotaindexCtrl')
    }
  });
  $stateProvider.state('quotadetail', {
    url: "/quotadetail",
    templateUrl: "template/quotadetail.html",
    params:{maincoin:"",subcoin:""},
    controller: "QuotadetailCtrl",
    resolve: {
          deps:app.loadControllerJs('./controllers/QuotadetailCtrl')
    }
  });
  $stateProvider.state('scan', {
    url: "/scan",
    templateUrl: "template/scan.html",
    controller: "ScanCtrl",
    resolve: {
          deps:app.loadControllerJs('./controllers/ScanCtrl')
    }
  });
    $stateProvider.state('asset', {
        url: "/asset",
        templateUrl: "template/asset/index.html",
        controller: "AssetCtrl",
        resolve: {
            deps:app.loadControllerJs('./controllers/AssetCtrl')
        }
    });
    $stateProvider.state('wallet_init', {
        url: "/asset/wallet_init",
        templateUrl: "template/asset/wallet_init.html",
        controller: "WalletInitCtrl",
        resolve: {
            deps:app.loadControllerJs('./controllers/asset/WalletInitCtrl')
        }
    });
    $stateProvider.state('wallet_create', {
        url: "/asset/wallet_create",
        templateUrl: "template/asset/wallet_create.html",
        controller: "WalletCreateCtrl",
        resolve: {
            deps:app.loadControllerJs('./controllers/asset/WalletCreateCtrl')
        }
    });
    $stateProvider.state('wallet_phrase', {
        url: "/asset/wallet_phrase",
        templateUrl: "template/asset/wallet_phrase.html",
        controller: "WalletphraseCtrl",
        resolve: {
            deps:app.loadControllerJs('./controllers/asset/WalletphraseCtrl')
        }
    });
    $stateProvider.state('walletphrase_next', {
        url: "/asset/walletphrase_next",
        templateUrl: "template/asset/walletphrase_next.html",
        controller: "WalletphrasenextCtrl",
        resolve: {
            deps:app.loadControllerJs('./controllers/asset/WalletphrasenextCtrl')
        }
    });
    $stateProvider.state('wallet_import', {
        url: "/asset/wallet_import",
        templateUrl: "template/asset/wallet_import.html",
        controller: "WalletImportCtrl",
        resolve: {
            deps:app.loadControllerJs('./controllers/asset/WalletImportCtrl')
        }
    });
    $stateProvider.state('wallet_main', {
        url: "/asset/wallet_main",
        templateUrl: "template/asset/wallet_main.html",
        params:{chainida:""},
        controller: "WalletMainCtrl",
        resolve: {
            deps:app.loadControllerJs('./controllers/asset/WalletMainCtrl')
        }
    });
    $stateProvider.state('wallet_receive', {
        url: "/asset/wallet_receive",
        templateUrl: "template/asset/wallet_receive.html",
        params:{chainidb:""},
        controller: "WalletReceiveCtrl",
        resolve: {
            deps:app.loadControllerJs('./controllers/asset/WalletReceiveCtrl')
        }
    });
    $stateProvider.state('wallet_send', {
        url: "/asset/wallet_send",
        templateUrl: "template/asset/wallet_send.html",
        params:{chainidc:"",toadr:""},
        controller: "WalletSendCtrl",
        resolve: {
            deps:app.loadControllerJs('./controllers/asset/WalletSendCtrl')
        }
    });
    $stateProvider.state('wallet_transactiondetail', {
        url: "/asset/wallet_transactiondetail",
        templateUrl: "template/asset/wallet_transactiondetail.html",
        params:{chainidd:"",txid:"",noid:""},
        controller: "WalletTrandetailCtrl",
        resolve: {
            deps:app.loadControllerJs('./controllers/asset/WalletTrandetailCtrl')
        }
    });
    $stateProvider.state('me', {
        url: "/me/index",
        templateUrl: "template/me/index.html",
        controller: "MeCtrl",
        resolve: {
            deps:app.loadControllerJs('./controllers/me/MeCtrl')
        }
    });
    $stateProvider.state('me_news', {
        url: "/me/news",
        templateUrl: "template/me/news.html",
        controller: "MeNewsCtrl",
        resolve: {
            deps:app.loadControllerJs('./controllers/me/MeNewsCtrl')
        }
    })
    $stateProvider.state('me_detail', {
        url: "/me/news_detail",
        templateUrl: "template/me/news_detail.html",
        controller: "MeNewsDetailCtrl",
        resolve: {
            deps:app.loadControllerJs('./controllers/me/MeNewsDetailCtrl')
        }
    })
    $stateProvider.state('me_helpCenter', {
        url: "/me/helpCenter",
        templateUrl: "template/me/helpCenter.html",
        controller: "MeHelpCtrl",
        resolve: {
            deps:app.loadControllerJs('./controllers/me/MeHelpCtrl')
        }
    })
    $stateProvider.state('me_helpdetail', {
        url: "/me/helpdetail",
        templateUrl: "template/me/helpdetail.html",
        controller: "MeHelpDetailCtrl",
        resolve: {
            deps:app.loadControllerJs('./controllers/me/MeHelpDetailCtrl')
        }
    })
    $stateProvider.state('me_feedback', {
        url: "/me/feedback",
        templateUrl: "template/me/feedback.html",
        controller: "MeFeedbackCtrl",
        resolve: {
            deps:app.loadControllerJs('./controllers/me/MeFeedbackCtrl')
        }
    })
    $stateProvider.state('me_update', {
        url: "/me/update",
        templateUrl: "template/me/update.html",
        controller: "MeUpdateCtrl",
        resolve: {
            deps:app.loadControllerJs('./controllers/me/MeUpdateCtrl')
        }
    })
    $stateProvider.state('me_agreement', {
        url: "/me/agreement",
        templateUrl: "template/me/agreement.html",
        controller: "MeAgreementCtrl",
        resolve: {
            deps:app.loadControllerJs('./controllers/me/MeAgreementCtrl')
        }
    })
    $stateProvider.state('me_support', {
        url: "/me/support",
        templateUrl: "template/me/support.html",
        controller: "MeSupportCtrl",
        resolve: {
            deps:app.loadControllerJs('./controllers/me/MeSupportCtrl')
        }
    })

    $stateProvider.state('me_wallet', {
        url: "/me/wallet/index",
        templateUrl: "template/me/wallet/index.html",
        controller: "MeWalletCtrl",
        resolve: {
            deps:app.loadControllerJs('./controllers/me/wallet/MeWalletCtrl')
        }
    })
    $stateProvider.state('me_inputPayPwd', {
        url: "/me/wallet/backup_inputPayPwd",
        templateUrl: "template/me/wallet/backup_inputPayPwd.html",
        controller: "MePayPwdCtrl",
        resolve: {
            deps:app.loadControllerJs('./controllers/me/wallet/MePayPwdCtrl')
        }
    })
    $stateProvider.state('me_backupPhrase', {
        url: "/me/wallet/backup_phrase",
        templateUrl: "template/me/wallet/backup_phrase.html",
        controller: "MePhraseCtrl",
        resolve: {
            deps:app.loadControllerJs('./controllers/me/wallet/MePhraseCtrl')
        }
    })
    $stateProvider.state('me_backupFile', {
            url: "/me/wallet/backup_file",
            templateUrl: "template/me/wallet/backup_file.html",
            controller: "MeBackupFileCtrl",
            resolve: {
                deps:app.loadControllerJs('./controllers/me/wallet/MeBackupFileCtrl')
            }
        })
     $stateProvider.state('me_backupFileNext', {
                url: "/me/wallet/backup_file_next",
                templateUrl: "template/me/wallet/backup_file_next.html",
                controller: "MeBackupFileNextCtrl",
                resolve: {
                    deps:app.loadControllerJs('./controllers/me/wallet/MeBackupFileNextCtrl')
                }
            })
    $stateProvider.state('me_resetpwd', {
        url: "/me/wallet/reset_paypwd",
        templateUrl: "template/me/wallet/reset_paypwd.html",
        controller: "MeResetPayPwdCtrl",
        resolve: {
            deps:app.loadControllerJs('./controllers/me/wallet/MeResetPayPwdCtrl')
        }
    })

    $stateProvider.state('me_remove_wallet', {
            url: "/me/wallet/remove_wallet",
            templateUrl: "template/me/wallet/remove_wallet.html",
            controller: "MeRemoveWalletCtrl",
            resolve: {
                deps:app.loadControllerJs('./controllers/me/wallet/MeRemoveWalletCtrl')
            }
        })
     $stateProvider.state('me_security', {
             url: "/me/security/index",
             templateUrl: "template/me/security/index.html",
             controller: "MeSecurityCtrl",
             resolve: {
                 deps:app.loadControllerJs('./controllers/me/security/MeSecurityCtrl')
             }
         })

    $stateProvider.state('me_general', {
             url: "/me/general/index",
             templateUrl: "template/me/general/index.html",
             cache:true,
             controller: "MeGeneralCtrl",
             resolve: {
                 deps:app.loadControllerJs('./controllers/me/general/MeGeneralCtrl')
             }
         })
      $stateProvider.state('security_setpin', {
         url: "/me/security/setpin",
         templateUrl: "template/me/security/setpin.html",
         controller: "SecuritySetpinCtrl",
         resolve: {
             deps:app.loadControllerJs('./controllers/me/security/SecuritySetpinCtrl')
         }
     })
    $stateProvider.state('footer', {
        url: "/footer",
        templateUrl: "template/footer.html",
        controller: "FooterCtrl",
        resolve: {
            deps:app.loadControllerJs('./controllers/FooterCtrl')
        }
    });
})
return app;
});
