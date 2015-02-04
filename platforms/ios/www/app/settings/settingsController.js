/**
 * Created by patricksullivan on 12/13/14.
 */


(function () {
    'use strict';

    angular.module('app').controller('settingsController', ["$scope",'settingsDataService','$cordovaGoogleAnalytics', settingsController]);

    function settingsController($scope,settingsDataService,$cordovaGoogleAnalytics) {
        $scope.settings = {};

        $scope.settingsChanged = function(){

            if(window.cordova){
                $cordovaGoogleAnalytics.trackEvent('Settings Changed','settingsChanged');
            }
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
        }

        $scope.init();

        $scope.$on('$ionicView.beforeEnter', function(){
            if(window.cordova){
                $cordovaGoogleAnalytics.trackView('Settings Screen');
            }
        });
    };
})();