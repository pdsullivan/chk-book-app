/**
 * Created by patricksullivan on 11/24/14.
 */

describe("accountsController", function() {

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
    }));

    beforeEach(function(){

        var accountToAdd = {
            name: "test",
            amount: 100.00,
            type: scope.accountTypes.checking
        };

        scope.addAccountItem(accountToAdd);
    });

    it("should have a scope variable defined", function() {
        expect(scope).toBeDefined();
    });

    it("should have a accounts array with one account", function(){
        expect(scope.accounts.length).toBe(1);
    });

    it("should have account types setup", function(){
        expect(scope.accountTypes.length).toBe(3);
    });

    it('should be able to add account', function(){
        expect(scope.accounts.length).toBe(1);
    });

    it("new account should have name 'test''", function(){
        expect(scope.accounts[0].name).toBe("test");
    });

    it("edited account should have name 'testedit''", function(){

        var account = angular.copy(scope.accounts[0]);
        account.name += 'edit';
        scope.saveEditedAccount(account);
        expect(scope.accounts[0].name).toBe("testedit");

    });

});