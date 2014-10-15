(function () {
    'use strict';

    angular.module('app').controller('menuController', ['$scope', '$ionicModal', '$timeout', menuController]);

    function menuController($scope, $ionicModal, $timeout) {
        // Form data for the login modal
        $scope.loginData = {};

        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('app/login/login.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.modal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeLogin = function() {
            $scope.modal.hide();
        };

        // Open the login modal
        $scope.login = function() {
            $scope.modal.show();
        };

        // Perform the login action when the user submits the login form
        $scope.doLogin = function() {
            console.log('Doing login', $scope.loginData);

            // Simulate a login delay. Remove this and replace with your login
            // code if using a login system
            $timeout(function() {
                $scope.closeLogin();
            }, 50000);
        };
    };
})();

<<<<<<< Updated upstream
=======
        $scope.loadAddAccount = function() {
        };

        // Perform the login action when the user submits the login form
        $scope.doAddAccount = function() {
            console.log('Doing Add', $scope.addAccountData.ammount);

            // Simulate a login delay. Remove this and replace with your login
            // code if using a login system
            $timeout(function() {
                $scope.closeAccountDetail();
                $scope.accounts.push($scope.addAccountData);
                $scope.addAccountData = {};
                $scope.saveAccountsData();
            }, 1000);
        };

        $scope.saveAccountsData = function(){
            window.localStorage['accounts'] = angular.toJson($scope.accounts);
        };


        $scope.listCanSwipe = true;
        $scope.accountClick = function(item){
            console.log('nav ', item.name);
            $state.go('app.accountTransactions');
        };

        $scope.onAccountDelete = function(item){
            var index = $scope.accounts.indexOf(item);
            $scope.accounts.splice(index, 1);
            $scope.saveAccountsData();
            swal("All Done!", "Account is deleted!", "success")

        };
>>>>>>> Stashed changes

