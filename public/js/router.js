angular.module('webApp').config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
    function ($stateProvider, $urlRouterProvider, $locationProvider) {
        $urlRouterProvider.otherwise('/');
        
        $stateProvider
                .state('app', {
                    abstract: true,
                    templateUrl: './views/components/app/app.html',
                    controller: 'appController'
                })
                .state('app.overview', {
                    url: '/',
                    templateUrl: './views/components/overview/overview.html',
                    controller: 'overviewController',
                    metaTags: {
                        title: 'Sandor Agafonoff Resume',
                        description: 'Creating amazing software is what I do. I am specifically geared towards software across the web and am passionate about making the web a better place.'
                    }
                });

        $locationProvider.html5Mode(true);
    }
]);