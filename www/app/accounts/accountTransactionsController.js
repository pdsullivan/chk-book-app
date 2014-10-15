
(function () {
    'use strict';

    angular.module('app').controller('accountTransactionsController', ['$scope', '$ionicModal', '$stateParams', '$timeout', '$state', accountTransactionsController]);

    function accountTransactionsController($scope, $ionicModal, $stateParams, $timeout, $state) {

        console.log('state1 params:', $stateParams);
        console.log('accounttranscontroller');
        $scope.transAccount = angular.fromJson($stateParams.accountName);
        console.log($scope.transAccount);

    };
})();