/**
 * Created by patricksullivan on 12/13/14.
 */


(function () {
    'use strict';

    angular.module('app').controller('settingsController', ["$scope",'settingsDataService', settingsController]);

    function settingsController($scope,settingsDataService) {
        $scope.settings = settingsDataService.getSettings();
        //$scope.settings = {};
        //console.log('',$scope.settings);
        $scope.settingsChanged = function(){
            $scope.saveSettings();
        }

        $scope.saveSettings = function() {
            settingsDataService.saveSettings($scope.settings);
        }

        var init = function(){


        }

        init();
    };
})();