
(function () {
    'use strict';

    angular.module('app').controller('aboutController', ["$scope","$ionicModal", '$stateParams', '$timeout', '$state', aboutController]);

    function aboutController($scope, $ionicModal, $stateParams, $timeout, $state) {

        $scope.version = '0.1';
        $scope.author = 'Patrick Sullivan'


    };
})();