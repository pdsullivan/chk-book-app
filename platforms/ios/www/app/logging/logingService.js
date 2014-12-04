/**
 * Created by patricksullivan on 12/1/14.
 */


(function () {
    'use strict';

    var serviceId = 'loggingService';
    angular.module('app').factory(serviceId, ['$http', loggingService]);

    function loggingService($http) {

        var url = 'http://pdsullivan.azurewebsites.net';

        var service = {
            pushData: pushData,
            logError: logError
        };

        return service;

        function logError(errorData, message) {

            console.log('ERROR', errorData);

            var errorLogItem = {
                appName: "ChkBook",
                event: "errorLog",
                message: message,
                details: errorData,
                date: new Date()
            };


            $http.post(url + '/api/errorlog/post', errorLogItem)
                .success(function(){
                    //alert('log success');
                })
                .error(function(){
                    //alert('log error');
                });



        }

        function pushData(data) {
            //fill in with post to api
            //will be async and can just die if error
            console.log('push data', data);
        }


    }
})();


