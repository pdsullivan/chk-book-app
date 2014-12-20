/**
 * Created by patricksullivan on 12/17/14.
 */
/**
 * Created by patricksullivan on 11/24/14.
 */

describe("accountTransactionsController", function() {

    var scope, controller;
    beforeEach(module('app'));

    beforeEach(inject(function (
        $rootScope,
        $controller,
        $ionicModal,
        $ionicPopup,
        $stateParams,
        $timeout,
        $state,
        $q) {



        scope = $rootScope.$new();
        controller = $controller('accountsController', {
            $scope: scope,
            $ionicModal: $ionicModal,
            $ionicPopup: $ionicPopup,
            $state: $state,
            $q: $q

        });

        var accountToAdd = {
            name: "test",
            amount: 100.00,
            type: scope.accountTypes.checking
        };

        scope.addAccountItem(accountToAdd);

        $stateParams.accountName = accountToAdd;

        controller = $controller('accountTransactionsController', {
            $scope: scope,
            $ionicModal: $ionicModal,
            $ionicPopup: $ionicPopup,
            $state: $state,
            $q: $q

        });
    }));


    beforeEach(function(){


    });

    it("should have a scope variable defined", function() {
        expect(scope).toBeDefined();
    });

    it("should have a the account named 'test'", function() {
        expect(scope.transAccount.name).toBe('test');
    });

    //TODO test the setting works to auto clear transactions.
    it("should use the setting for auto signing off new transactions", function() {

        //going to need to pull in the settingsDataService
        //then set the setting for autoClearTrans

        expect(true).toBe(true);

    });

});