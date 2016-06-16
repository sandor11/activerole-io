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