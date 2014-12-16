/**
 * Created by patricksullivan on 12/13/14.
 */


(function () {
    'use strict';

    angular.module('app').controller('settingsController', ["$scope",'settingsDataService', settingsController]);

    function settingsController($scope,settingsDataService) {
        $scope.settings = {};
        //$scope.settings = settingsDataService.getSettings();
        //$scope.settings = {};
        //console.log('',$scope.settings);
        $scope.settingsChanged = function(){
            $scope.saveSettings();
        }

        $scope.saveSettings = function() {
            settingsDataService.saveSettings($scope.settings);
        }

        $scope.init = function(){
            settingsDataService.getSettings()
                .then(function(data){
                    console.log('settings received');
                    $scope.settings = data;
                });
            //$scope.settings = settingsDataService.getSettings();

        }

        $scope.init();
    };
})();