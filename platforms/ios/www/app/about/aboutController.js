
(function () {
    'use strict';

    angular.module('app').controller('aboutController', ["$scope", aboutController]);

    function aboutController($scope) {
        $scope.version = '1.1';
        $scope.author = 'Patrick Sullivan';
    };
})();