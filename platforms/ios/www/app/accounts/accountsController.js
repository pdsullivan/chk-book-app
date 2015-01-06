
(function () {
    'use strict';

    angular.module('app').controller('accountsController', [
        "$scope",
        "$ionicModal",
        '$ionicPopup',
        '$state',
        'loggingService',
        'accountDataService',
        'settingsDataService',
        '$q',
        accountsController]);

    function accountsController($scope,
                                $ionicModal,
                                $ionicPopup,
                                $state,
                                loggingService,
                                accountDataService,
                                settingsDataService,
                                $q) {

        $scope.addAccountData = {};
        $scope.editAccountData = {};

        $scope.accounts = [];
        $scope.transactions = [];
        $scope.accountTypes = [
            'saving',
            'checking',
            'other'
        ];


        $scope.totalAccounts = function(){
            angular.forEach($scope.accounts, function(item){
                //add up item.amount's into a variable.
                $scope.transAccount = item.id;

                accountDataService.getTransactions(item)
                    .then(function(data){
                        $scope.transactions = data;
                        item.total = item.amount;

                        angular.forEach($scope.transactions, function(value, key) {
                            //if(value.cleared){
                            if(value.isPositive){
                                item.total = (item.total + value.amount);

                            } else {
                                item.total = (item.total - value.amount);
                            }
                            //}
                        });

                        $scope.transactions = [];
                    });


            });
            //save that variable to the database.
            //
            $scope.saveAccountsData();
        };

        $scope.loadAccounts = function(){
            //service work

            //var accountsstring = window.localStorage['accounts'];
            //if(accountsstring) {
            //    $scope.accounts = angular.fromJson(accountsstring);
            //}
            accountDataService.getAccounts()
                .then(function(data){
                    console.log('load accounts', data);
                    if(data != null){
                        $scope.accounts = data;

                    }

                    $scope.totalAccounts();

                    $scope.saveAccountsData();
                });


        };



        $ionicModal.fromTemplateUrl('app/accounts/accountAdd.html', {
            scope: $scope
        }).then(function(acdmodal) {
            $scope.accountAddModal = acdmodal;
        });


        // Triggered in the login modal to close it
        $scope.closeAddAccountModal = function() {
            $scope.accountAddModal.hide();
        };

        $scope.showAddAccountModal = function() {
            $scope.accountAddModal.show();
            $scope.addAccountData.id = guid();
        };

        $scope.submitAddAccount = function() {
            console.log('Doing Add', $scope.addAccountData);

            $scope.closeAddAccountModal();

            $scope.addAccountItem($scope.addAccountData);

            $scope.addAccountData = {};


        };

        $scope.addAccountItem = function(accountToAdd) {
            $scope.accounts.push(accountToAdd);
            $scope.totalAccounts();
            $scope.saveAccountsData();

        }

        //TODO: pull into service
        $scope.saveAccountsData = function(){
            window.localStorage['accounts'] = angular.toJson($scope.accounts);
        };


        $scope.listCanSwipe = true;
        $scope.accountClick = function(item){
            console.log('nav ', item.name);
            $state.go('app.accountTransactions', {accountName: angular.toJson(item)});
        };

        //TODO: pull into service
        $scope.onAccountDelete = function(item){
            var confirmPopup = $ionicPopup.confirm({
                title: 'Delete Account',
                template: 'Are you sure you want to delete this account?'
            });

            confirmPopup.then(function(res) {
                if(res) {

                    localStorage.removeItem(item.id+'transactions');

                    var index = $scope.accounts.indexOf(item);
                    $scope.accounts.splice(index, 1);
                    $scope.saveAccountsData();
                } else {
                    console.log('You are not sure');
                }
            });
        };

        /////////// EDIT ACCOUNT MODAL STUFF  //////////////////////


        $ionicModal.fromTemplateUrl('app/accounts/accountEdit.html', {
            scope: $scope
        }).then(function(acteditmodal) {
            $scope.accountEditModal = acteditmodal;
        });

        $scope.onAccountEdit = function(item) {
            $scope.editAccountData.id = item.id;
            $scope.editAccountData.name = item.name;
            $scope.editAccountData.type = item.type;
            $scope.editAccountData.amount = item.amount;
            $scope.accountEditModal.show();
        };

        $scope.closeAccountEdit = function() {
            $scope.accountEditModal.hide();
            $scope.editAccountData = {};
        };

        $scope.doEditAccount = function() {
            console.log('Done Editing');

            $scope.accountEditModal.hide();

            //for (var i = 0; i < $scope.accounts.length; i++) {
            //    var currentItem = $scope.accounts[i];
            //    if(currentItem.id == $scope.editAccountData.id){
            //        currentItem.name = $scope.editAccountData.name;
            //        currentItem.type = $scope.editAccountData.type;
            //    }
            //}

            $scope.saveEditedAccount($scope.editAccountData);

            $scope.editAccountData = {};
        };

        $scope.saveEditedAccount = function(account){
            for (var i = 0; i < $scope.accounts.length; i++) {
                var currentItem = $scope.accounts[i];
                if(currentItem.id == account.id){
                    currentItem.name = account.name;
                    currentItem.type = account.type;
                    currentItem.amount = account.amount;
                }
            }

            $scope.saveAccountsData();
            $scope.totalAccounts();
        };

        console.log('RUNNING THE WHOLE CONTROLLER');


        $scope.$on('$ionicView.beforeEnter', function(){
            console.log('BEFORE ENTER');
            $scope.loadAccounts();
        });

        ///////////////////////////
        //////GuId Method
        ///////////////////////////
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