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