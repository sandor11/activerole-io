angular.module('webApp').controller('overviewController', ['$scope',
    function($scope) {
        $scope.highlight = {
            java: false,
            js: false,
            ms: false,
            front: false,
            back: false
        };
    }
]); 