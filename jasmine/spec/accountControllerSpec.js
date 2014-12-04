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

    it("should have a scope variable defined", function() {
        expect(scope).toBeDefined();
    });

    it("should have a accounts array", function(){
        expect(scope.accounts.length).toBe(0);
    });

    it("should have account types setup", function(){
        expect(scope.accountTypes.length).toBe(3);
    });



});