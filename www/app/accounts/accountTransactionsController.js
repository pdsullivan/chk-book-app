
(function () {
    'use strict';

    angular.module('app').controller('accountTransactionsController', ['$scope', '$ionicModal', '$stateParams', '$timeout', '$state', accountTransactionsController]);

    function accountTransactionsController($scope, $ionicModal, $stateParams, $timeout, $state) {


        //
        //update totals now are working off of calculations each time.
        //might want to update a main total then from there that would be a running total.
        //will only want to update once each time something changes...will want to make sure and update
        //back to the account total on the main screen.
        $scope.addTransactionData = {};
        $scope.transactions = [];


        console.log('state1 params:', $stateParams);


        $scope.transAccount = angular.fromJson($stateParams.accountName);

        console.log($scope.transAccount);

        $scope.updateTotal = function(){


            angular.forEach($scope.transactions, function(value, key) {
                $scope.transAccount.amount = ($scope.transAccount.amount + value.amount);
            });

        };

        $scope.loadTransactions = function(){
            var transString = window.localStorage[$scope.transAccount.id+'transactions'];
            if(transString) {
                $scope.transactions = angular.fromJson(transString);
            }
            $scope.updateTotal();
        };

        $scope.saveTransactions = function(){
            window.localStorage[$scope.transAccount.id+'transactions'] = angular.toJson($scope.transactions);
            $scope.updateTotal();
        };

        $ionicModal.fromTemplateUrl('app/accounts/addTransaction.html', {
            scope: $scope
        }).then(function(addTranModal) {
            $scope.addTranModal = addTranModal;
        });

        $scope.addTransaction = function() {
            $scope.addTransactionData.id = guid();
            $scope.addTransactionData.amount = 0.00;
            $scope.addTransactionData.isPositive = false;
            $scope.addTranModal.show();
        };

        $scope.closeAddTransaction = function() {
            $scope.addTranModal.hide();
        };

        $scope.doAddTransaction = function(data) {
            console.log('Doing Add Transaction', data.amount);

            // Simulate a login delay. Remove this and replace with your login
            // code if using a login system

            $scope.closeAddTransaction();
            $scope.transactions.push($scope.addTransactionData);
            $scope.addTransactionData = {};
            $scope.saveTransactions();
            $scope.updateTotal();

        };

        $scope.onTransactionDelete = function(item){
            var index = $scope.transactions.indexOf(item);
            $scope.transactions.splice(index, 1);
            $scope.saveTransactions();
            $scope.updateTotal();

        };

        $scope.onChangePositiveNegativeToggle = function(data){
            if(data){
                $scope.addTransactionData.amount = Math.abs($scope.addTransactionData.amount);

            } else {
                $scope.addTransactionData.amount = $scope.addTransactionData.amount * -1;
            }
            $scope.addTransactionData.isPositive = data;
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