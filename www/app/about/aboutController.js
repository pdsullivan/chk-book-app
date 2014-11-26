
(function () {
    'use strict';

    angular.module('app').controller('aboutController', ["$scope","$ionicModal", '$stateParams', '$timeout', '$state', aboutController]);

    function aboutController($scope) {

        $scope.version = '1.0';
        $scope.author = 'Patrick Sullivan'


    };
})();