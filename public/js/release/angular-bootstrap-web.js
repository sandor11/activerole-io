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
angular.module('webApp')
    .directive('lightgallery', 
        function () {
            function initialize($el, $attr) {
                var autoopen = $attr.hasOwnProperty('autoopen') ? true : false;
                var selector = $attr.hasOwnProperty('selector') ? $attr.selector : '';
                var galleryId = $attr.hasOwnProperty('galleryId') ? +$attr.galleryId : 1;
                $el.lightGallery({
                    thumbnail: true,
                    zoom: true,
                    scale: 1,
                    actualSize: true,
                    fullScreen: true,
                    autoplayControls: true,
                    selector: selector,
                    hash: false,
                    galleryId: galleryId
                });
                if (autoopen && selector) {
                    var item = $(selector).find(':first');
                    item.click();
                }
            }
            return {
                restrict: 'C',
                link: function ($scope, $element, $attr) {
                    if ($attr.hasOwnProperty('initEvent')) {
                        $scope.$on($attr.initEvent, function () {
                            initialize($element, $attr);
                        });
                    }
                    else {
                        initialize($element, $attr);
                    }
                }
            };
        }
    );
angular.module('webApp').directive('ngRepeatComplete', ['$rootScope', '$timeout',
        function ($rootScope, $timeout) {
            return {
                restrict: 'A',
                link: function ($scope, $element, $attr) {
                    if ($scope.$last) {
                        $timeout(function () {
                            $rootScope.$broadcast($attr.ngRepeatComplete, true);
                        });
                    }
                }
            };
        }]
    );
angular.module('webApp').service('preloadService', ['$rootScope', function ($rootScope) {
        var preloaders = [];
        var callbacks = [];
        
        var loading = false;
        this.register = function (element) {
            preloaders.push(element);
        };

        this.deregister = function (element) {
            element.removeClass('preload');
            preloaders.splice(preloaders.indexOf(element), 1);
        };

        this.start = function () {
            window.loading_screen = window.pleaseWait({
                logo: '',
                backgroundColor: '#09F',
                loadingHtml: '<div class="loading-message c-white font-light fs-24 m-0-auto" style="max-width:540px;"><div><img src="img/app-icon-flat-hdpi.png" style="width:50%;" /></div><div class="m-t-30">Opening Personnel File</div></div>'
            });
            loading = true;
        };

        this.isLoading = function () {
            return loading;
        };
        
        this.registerCallback = function(fn) {
            if (!loading) {
                fn.call();
            }
            else {
                callbacks.push(fn);
            }
        };
        
        function completeCallbacks() {
            while(callbacks.length) {
                callbacks.shift().call();
            }
        }

        this.quit = function () {
            if (!preloaders.length) {
                if (window.loading_screen) {
                    window.loading_screen.finish(false, function () {
                        $('.wait').removeClass('wait');
                        window.loading_screen = null;
                        $rootScope.$broadcast('app.layout.loaded');
                        loading = false;
                        completeCallbacks();
                    });
                }
            }
        };
    }]).directive('splash', ['$timeout', '$rootScope', 'preloadService',
        function ($timeout, $rootScope, preloadService) {
            return {
                restrict: 'E',
                link: function ($scope, $element, $attr) {
                    preloadService.start();

                    $rootScope.$on('$viewContentLoaded', function (event) {
                        preloadService.quit();
                    });
                }
            };
        }]
    );
angular.module('webApp').controller('appController', ['$scope',
    function($scope) {
    }
]); 
angular.module('webApp').controller('overviewController', ['$scope',
    function($scope) {
        $scope.highlight = {
            java: false,
            js: false,
            lamp: false,
            html: false,
            ms: false,
            front: false,
            back: false
        };
    }
]); 
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