
(function () {
    'use strict';

    angular.module('app').controller('accountsController', ["$scope","$ionicModal", '$stateParams', '$timeout', '$state', accountsController]);

    function accountsController($scope, $ionicModal, $stateParams, $timeout, $state) {

        $scope.addAccountData = {};

        $scope.accounts = [];

        $scope.totalAccounts = function(){
            angular.forEach($scope.accounts, function(item){
                //add up item.amount's into a variable.

            });
            //save that variable to the database.
            //
        };

        $scope.loadAccounts = function(){
            var accountsstring = window.localStorage['accounts'];
            if(accountsstring) {
                $scope.accounts = angular.fromJson(accountsstring);
            }

            $scope.saveAccountsData();
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
            console.log('Doing Add', $scope.addAccountData.amount);

            // Simulate a login delay. Remove this and replace with your login
            // code if using a login system
            $timeout(function() {
                $scope.closeAccountDetail();
                $scope.accounts.push($scope.addAccountData);
                $scope.addAccountData = {};
                $scope.saveAccountsData();
            }, 500);
        };

        $scope.saveAccountsData = function(){
            window.localStorage['accounts'] = angular.toJson($scope.accounts);
        };


        $scope.listCanSwipe = true;
        $scope.accountClick = function(item){
            console.log('nav ', item.name);
            $state.go('app.accountTransactions', {accountName: angular.toJson(item)});
        };

        $scope.onAccountDelete = function(item){
            var index = $scope.accounts.indexOf(item);
            $scope.accounts.splice(index, 1);
            $scope.saveAccountsData();
            $scope.$apply();
            swal("All Done!", "Account is deleted!", "success")

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
                }
            }
            $scope.editAccountData = {};
            $scope.saveAccountsData();
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