
(function () {
    'use strict';

    angular.module('app').controller('accountsController', ["$scope","$ionicModal", '$stateParams', '$timeout', '$state', accountsController]);

    function accountsController($scope, $ionicModal, $stateParams, $timeout, $state) {

        $scope.TestTitle = "asdfaf a";
        $scope.addAccountData = {};

        $scope.accounts = [];


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
//            $scope.addAccountData.ammount = "0.00";
//            $scope.addAccountData.name = "New Account";
        };

        $scope.loadAddAccount = function() {
        };

        // Perform the action when the user submits the form
        $scope.doAddAccount = function() {
            console.log('Doing Add', $scope.addAccountData.ammount);

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