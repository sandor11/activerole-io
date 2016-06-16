var webApp = angular.module('webApp', ['ngAnimate', 'ui.router', 'ui.bootstrap', 'ui.router.metatags']);

webApp.factory('appConfig', [function () {
        function getEnv() {
            return 'development';
        }

        var schemas = {
            production: {
            },
            development: {
                name: 'Sandor Agafonoff',
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
            if (!toParams.retainScroll) {
                document.body.scrollTop = document.documentElement.scrollTop = 0;
            }
            $rootScope.activeState = toState.name;
        });
    }
]);