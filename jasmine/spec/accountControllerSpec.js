/**
 * Created by patricksullivan on 11/24/14.
 */

describe("accountsController", function() {


    var scope, controller;
    beforeEach(module('app'));

    beforeEach(inject(function ($rootScope, $controller, $ionicModal,$ionicPopup,$stateParams,$timeout,$state) {
        scope = $rootScope.$new();

            controller = $controller('accountsController', {
                $scope: scope,
                $ionicModal: $ionicModal,
                $ionicPopup: $ionicPopup,
                $stateParams: $stateParams,
                $timeout: $timeout,
                $state: $state

        });
    }));

    it("should have a $scope variable", function() {
        expect(scope).toBeDefined();
    });

    it("should have a accounts array", function(){
        //test

        expect(scope.accounts.length).toBe(1);
    });

    //
    //it("should have a type", function(){
    //
    //
    //});
    //
    //it("should have a starting value", function(){
    //
    //
    //});

});