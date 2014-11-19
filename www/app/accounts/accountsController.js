
(function () {
    'use strict';

    angular.module('app').controller('accountsController', ["$scope","$ionicModal",'$ionicPopup', '$stateParams', '$timeout', '$state', accountsController]);

    function accountsController($scope, $ionicModal, $ionicPopup, $stateParams, $timeout, $state) {

        $scope.addAccountData = {};
        $scope.accounts = [];
        $scope.transactions = [];
        $scope.accountTypes = [
            'saving',
            'checking',
            'other'
        ];

        //TODO: pull into service
        $scope.loadTransactions = function(account){
            var transString = window.localStorage[account.id+'transactions'];
            if(transString) {
                $scope.transactions = angular.fromJson(transString);
            }
        };

        $scope.totalAccounts = function(){
            angular.forEach($scope.accounts, function(item){
                //add up item.amount's into a variable.
                $scope.transAccount = item.id;

                $scope.loadTransactions(item);

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
            //save that variable to the database.
            //
            $scope.saveAccountsData();
        };

        $scope.loadAccounts = function(){
            var accountsstring = window.localStorage['accounts'];
            if(accountsstring) {
                $scope.accounts = angular.fromJson(accountsstring);
            }

            $scope.totalAccounts();

            $scope.saveAccountsData();
            //bla

        };



        $ionicModal.fromTemplateUrl('app/accounts/accountAdd.html', {
            scope: $scope
        }).then(function(acdmodal) {
            $scope.accountDetailModal = acdmodal;
        });


        // Triggered in the login modal to close it
        $scope.closeAccountDetail = function() {
            $scope.accountDetailModal.hide();
        };

        // Open the login modal
        $scope.addAccount = function() {
            $scope.accountDetailModal.show();
            $scope.addAccountData.id = guid();
        };

        $scope.loadAddAccount = function() {

        };

        // Perform the action when the user submits the form
        $scope.doAddAccount = function() {
            console.log('Doing Add', $scope.addAccountData);


            $scope.closeAccountDetail();
            $scope.accounts.push($scope.addAccountData);
            $scope.addAccountData = {};
            $scope.totalAccounts();
            $scope.saveAccountsData();

        };

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

        $scope.editAccountData = {};

        $ionicModal.fromTemplateUrl('app/accounts/accountEdit.html', {
            scope: $scope
        }).then(function(acteditmodal) {
            $scope.accountEditModal = acteditmodal;
        });

        $scope.onAccountEdit = function(item) {
            $scope.editAccountData.id = item.id;
            $scope.editAccountData.name = item.name;
            $scope.editAccountData.type = item.type;
            $scope.accountEditModal.show();
        };

        $scope.closeAccountEdit = function() {
            $scope.accountEditModal.hide();
            $scope.editAccountData = {};
        };

        $scope.doEditAccount = function() {
            console.log('Done Editing');

            $scope.accountEditModal.hide();

            for (var i = 0; i < $scope.accounts.length; i++) {
                var currentItem = $scope.accounts[i];
                if(currentItem.id == $scope.editAccountData.id){
                    currentItem.name = $scope.editAccountData.name;
                    currentItem.type = $scope.editAccountData.type;
                }
            }
            $scope.editAccountData = {};
            $scope.saveAccountsData();
        };



        $scope.getAccountbyId = function(id){
          angular.forEach($scope.accounts, function(item){
              if(item.id == id){
                  return item;
              }

          });
        };

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