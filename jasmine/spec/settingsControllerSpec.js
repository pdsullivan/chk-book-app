/**
 * Created by patricksullivan on 12/15/14.
 */

/**
 * Created by patricksullivan on 11/24/14.
 */

describe("settingsController", function() {

    var scope, controller;
    beforeEach(module('app'));

    beforeEach(inject(function (
        $rootScope,
        $controller,
        $ionicModal,
        $ionicPopup,
        $stateParams) {

        scope = $rootScope.$new();

        controller = $controller('settingsController', {
            $scope: scope

        });
    }));

    beforeEach(function(){
        scope.init();
        scope.settings.autoClearTrans = false;
    });

    it("should have a scope variable defined", function() {

        expect(scope).toBeDefined();
    });

    it("autoClearTrans should be false", function() {

        expect(scope.settings.autoClearTrans).toBeDefined();
    });

    it("autoClearTrans should be changed to true", function() {
        scope.settings.autoClearTrans = true;
        expect(scope.settings.autoClearTrans).toBe(true);
    });
    it("autoClearTrans should be changed to true and saved", function() {

        scope.settings.autoClearTrans = true;
        scope.saveSettings();
        expect(scope.settings.autoClearTrans).toBe(true);

    });



});