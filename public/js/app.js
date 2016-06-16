var webApp = angular.module('webApp', ['ngAnimate', 'ui.router', 'ui.bootstrap', 'ui.router.metatags']);

webApp.factory('appConfig', [function () {
        function getEnv() {
            return 'development';
        }

        var schemas = {
            production: {
            },
            development: {
                name: 'Sandy Agafonoff',
                version: 'v1.0',
                author: 'Sandor Agafonoff',
                license: 'MIT License'
            }
        };

        return schemas[getEnv()];
    }
]);

webApp.config(['UIRouterMetatagsProvider', function(UIRouterMetatagsProvider) {
        UIRouterMetatagsProvider
        .setTitleSuffix(' - awesome.com');
}]);

webApp.run(['$location', '$state', '$rootScope', '$timeout', '$window', 'appConfig', 'preloadService', 'MetaTags',
    function ($location, $state, $rootScope, $timeout, $window, appConfig, preloadService, MetaTags) {        
        $rootScope.MetaTags = MetaTags;
        $rootScope.appConfig = appConfig;
        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState) {
            if (toState.scroll) {
                if (toState.scroll.elem === 'top') {
                    document.body.scrollTop = document.documentElement.scrollTop = 0;
                }
                else {
                    $timeout(function() {
                        $('html, body').animate({
                            scrollTop: $('#' + toState.scroll.elem).offset().top - 50
                        }, 650);
                    });
                }
            }
            $rootScope.activeState = toState.name;
        });
    }
]);