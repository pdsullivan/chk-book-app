
(function () {
    'use strict';

    angular.module('app').controller('accountTransactionsController', ['$scope', '$ionicModal','$ionicPopup', '$stateParams', '$timeout', '$state', accountTransactionsController]);

    function accountTransactionsController($scope,
                                           $ionicModal,
                                           $ionicPopup,
                                           $stateParams) {


        //
        //update totals now are working off of calculations each time.
        //might want to update a main total then from there that would be a running total.
        //will only want to update once each time something changes...will want to make sure and update
        //back to the account total on the main screen.
        $scope.addTransactionData = {};
        $scope.editTransactionData = {};
        $scope.transactions = [];
        $scope.predicate = '-date , -createdDate';

        $scope.transAccount = angular.fromJson($stateParams.accountName);

        console.log('state1 params:', $stateParams);

        var initController = function(){
            $scope.loadTransactions();

        }

        //TODO: pull into service
        $scope.loadTransactions = function(){
            var transString = window.localStorage[$scope.transAccount.id+'transactions'];
            if(transString) {
                $scope.transactions = angular.fromJson(transString);
                console.log('log', $scope.transactions);
            }
            $scope.updateTotal();
        };


        //TODO: pull into service
        $scope.deleteTransaction = function(item){

            var index = $scope.transactions.indexOf(item);
            $scope.transactions.splice(index, 1);
            $scope.saveTransactions();
            $scope.updateTotal();
        }

        $scope.updateTotal = function(){

            $scope.transAccount.total = $scope.transAccount.amount;
            $scope.transAccount.cleared = $scope.transAccount.amount;
            $scope.transAccount.outstanding = 0.00;

            angular.forEach($scope.transactions, function(value, key) {
                if(value.cleared){
                    if(value.isPositive){
                        //$scope.transAccount.cleared = ($scope.transAccount.total + value.amount);
                        $scope.transAccount.cleared += value.amount;

                    } else {
                        //$scope.transAccount.cleared = ($scope.transAccount.total - value.amount);
                        $scope.transAccount.cleared -= value.amount;
                    }
                } else {
                    if(value.isPositive){
                        $scope.transAccount.outstanding +=  value.amount;

                    } else {
                        $scope.transAccount.outstanding -= value.amount;
                    }
                }


                if(value.isPositive){
                    $scope.transAccount.total = ($scope.transAccount.total + value.amount);

                } else {
                    $scope.transAccount.total = ($scope.transAccount.total - value.amount);
                }


            });

        };


        $scope.checkboxClick = function(item){
            console.log('checkbox click', item.cleared);
            $scope.updateTotal();
            $scope.saveTransactions();

        };

        //TODO: pull into service
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
            console.log('addTransaction');
            $scope.addTransactionData.id = guid();
            $scope.addTransactionData.amount = null;
            $scope.addTransactionData.isPositive = false;
            $scope.addTransactionData.createdDate = new Date();
            $scope.addTranModal.show();
        };

        $scope.closeAddTransaction = function() {
            $scope.addTranModal.hide();
        };

        $scope.doAddTransaction = function(data) {
            console.log('Doing Add Transaction', data.amount);

            $scope.closeAddTransaction();
            $scope.addTransactionData.cleared = false;
            $scope.transactions.push($scope.addTransactionData);
            $scope.addTransactionData = {};
            $scope.saveTransactions();
            $scope.updateTotal();

        };

        $scope.onTransactionDelete = function(item){
            var confirmPopup = $ionicPopup.confirm({
                title: 'Delete',
                template: 'Are you sure you want to delete this item?'
            });
            confirmPopup.then(function(res) {
                if(res) {
                    $scope.deleteTransaction(item);
                } else {
                    console.log('You are not sure');
                }
            });

        };

        $scope.onChangePositiveNegativeToggle = function(data){
            $scope.addTransactionData.isPositive = data;
        };




        //-----------------EDIT TRANSACTIONS-------------------

        $ionicModal.fromTemplateUrl('app/accounts/editTransaction.html', {
            scope: $scope
        }).then(function(editTranModal) {
            $scope.editTranModal = editTranModal;
        });

        $scope.editTransaction = function(item) {
            console.log(item);
            $scope.editTransactionData = angular.copy(item);
            $scope.editTranModal.show();
        };

        $scope.closeEditTransaction = function() {
            $scope.editTranModal.hide();
            $scope.editTransactionData = {};
        };

        $scope.doEditTransaction = function(data) {
            console.log('Doing Add Transaction', data);

            $scope.closeEditTransaction();


            var index ;

            for (var i = 0; i < $scope.transactions.length; i++) {
                var currentItem = $scope.transactions[i];

                if(currentItem.id == data.id){
                    index = i;
                    //$scope.transactions[i] = $scope.editTransactionData;
                }
            }

            $scope.transactions.splice(index, 1);
            //add
            $scope.transactions.push(data);

            $scope.editTransactionData = {};


            $scope.saveTransactions();
            $scope.updateTotal();

        };

        $scope.onChangePositiveNegativeToggleEdit = function(data){
            $scope.editTransactionData.isPositive = data;
        };






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

        initController();


    };
})();