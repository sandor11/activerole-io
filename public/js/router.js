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
                    },
                    scroll: {
                        elem: 'top'
                    }
                })
                .state('app.overview.objective', {
                    url: 'objective',
                    metaTags: {
                        title: 'Objective',
                        description: 'To find a position in software development which allows me to be creative, have input, and either oversee or be a part of the end to end delivery process.'
                    },
                    scroll: {
                        elem: 'objective'
                    }
                })
                .state('app.overview.experience', {
                    url: 'experience',
                    metaTags: {
                        title: 'Work Experience',
                        description: 'I have seen many technologies, been a part of many teams and deliver a bunch of projects. Here is the run down.'
                    },
                    scroll: {
                        elem: 'experience'
                    }
                })
                .state('app.overview.extras', {
                    url: 'extras',
                    metaTags: {
                        title: 'Extras',
                        description: 'I love to work, coding is my thing. I also love the variety of people you get to meet whie doing it. My world does not stop with coding though.'
                    },
                    scroll: {
                        elem: 'extras'
                    }
                })
                .state('app.overview.contact', {
                    url: 'contact',
                    metaTags: {
                        title: 'Get in Touch',
                        description: 'If you would to contact me about a role you may have then send me an email.'
                    },
                    scroll: {
                        elem: 'contact'
                    }
                });

        $locationProvider.html5Mode(true);
    }
]);