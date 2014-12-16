/**
 * Created by patricksullivan on 12/15/14.
 */

/**
 * Created by patricksullivan on 12/1/14.
 */

/**
 * Created by patricksullivan on 12/1/14.
 */


(function () {
    'use strict';

    var serviceId = 'settingsDataService';

    angular.module('app').factory(serviceId, ['$http','$q', settingsDataService]);

    function settingsDataService($http,$q) {


        var service = {
            getSettings: getSettings,
            saveSettings: saveSettings
        };

        return service;

        function getSettings() {

            var settings = null;
            var settingsString = window.localStorage['settings'];
            console.log(settingsString);
            if(settingsString) {
                settings = angular.fromJson(settingsString);
            } else {
                //if there are no settings set set a default
                settings = {
                    autoClearTrans: false
                };
            }
            return $q.when(settings);
        }

        function saveSettings(settings) {
            window.localStorage['settings'] = angular.toJson(settings);
        }


    }
})();
