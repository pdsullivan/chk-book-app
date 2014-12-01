/**
 * Created by patricksullivan on 12/1/14.
 */


(function () {
    'use strict';

    var serviceId = 'loggingService';
    angular.module('app').factory(serviceId, ['$http', loggingService]);

    function loggingService($http) {

        var service = {
            pushData: pushData,
            logError: logError
        };

        return service;

        function logError(errorData) {
            console.log('ERROR', errorData);
        }

        function pushData(data) {
            //fill in with post to api
            //will be async and can just die if error
            console.log('push data', data);
        }


    }
})();