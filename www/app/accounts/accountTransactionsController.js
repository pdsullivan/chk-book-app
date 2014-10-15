
(function () {
    'use strict';

    angular.module('app').controller('accountTransactionsController', ['$scope', '$ionicModal', '$stateParams', '$timeout', '$state', accountTransactionsController]);

    function accountTransactionsController($scope, $ionicModal, $stateParams, $timeout, $state) {


        $scope.addTransactionData = {};
        $scope.transactions = [];


        console.log('state1 params:', $stateParams);
        console.log('accounttranscontroller');
        $scope.transAccount = angular.fromJson($stateParams.accountName);
        console.log($scope.transAccount);

        $scope.loadTransactions = function(){
            var transString = window.localStorage[$scope.transAccount.id+'transactions'];
            if(transString) {
                $scope.transactions = angular.fromJson(transString);
            }
        };
        $scope.saveTransactions = function(){
            window.localStorage[$scope.transAccount.id+'transactions'] = angular.toJson($scope.transactions);
        };

        $ionicModal.fromTemplateUrl('app/accounts/addTransaction.html', {
            scope: $scope
        }).then(function(addTranModal) {
            $scope.addTranModal = addTranModal;
        });
        $scope.addTransaction = function() {
            $scope.addTranModal.show();
            $scope.addTransactionData.id = guid();
//            $scope.addAccountData.ammount = "0.00";
//            $scope.addAccountData.name = "New Account";
        };
        $scope.closeAddTransaction = function() {
            $scope.addTranModal.hide();
        };

        $scope.doAddTransaction = function() {
            console.log('Doing Add Transaction', $scope.addTransactionData.amount);

            // Simulate a login delay. Remove this and replace with your login
            // code if using a login system
            $timeout(function() {
                $scope.closeAddTransaction();
                $scope.transactions.push($scope.addTransactionData);
                $scope.addTransactionData = {};
                $scope.saveTransactions();
            }, 500);
        };

        $scope.loadTransactions();

        var guid = (function() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return function() {
                return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                    s4() + '-' + s4() + s4() + s4();
            };
        })();

    };
})();