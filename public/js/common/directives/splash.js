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
                loadingHtml: '<div class="loading-message text-uppercase c-white font-meduim fs-36">Just getting ready.</div>'
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