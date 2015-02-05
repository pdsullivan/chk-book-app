/**
 * Created by patricksullivan on 12/1/14.
 */


(function () {
    'use strict';

    var serviceId = 'loggingService';
    angular.module('app').factory(serviceId, ['$http','$cordovaGoogleAnalytics', loggingService]);

    function loggingService($http,$cordovaGoogleAnalytics) {

        var url = 'http://pdsullivan.azurewebsites.net';

        var service = {
            pushData: pushData,
            logError: logError
        };

        return service;

        function logError(errorData, message) {


            if(window.cordova){
                $cordovaGoogleAnalytics.trackEvent('error handler',message);
            } else {
                if(console){console.log('error handler: ',message);}
            }


        }

        function pushData(data) {
            //fill in with post to api
            //will be async and can just die if error
            console.log('push data', data);
        }


    }
})();


