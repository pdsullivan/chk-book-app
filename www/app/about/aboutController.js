
(function () {
    'use strict';

    angular.module('app').controller('aboutController', ["$scope",'$cordovaAppRate','$cordovaGoogleAnalytics', aboutController]);

    function aboutController($scope,$cordovaAppRate,$cordovaGoogleAnalytics) {
        $scope.version = '1.2';
        $scope.author = 'Patrick Sullivan';

        $scope.sendFeedback =function(){

            if(window.cordova){
                $cordovaGoogleAnalytics.trackEvent('Send Feedback','sendFeedback');
            }

            if(window.plugins && window.plugins.emailComposer) {
                window.plugins.emailComposer.showEmailComposerWithCallback(function(result) {
                        console.log("Response -> " + result);
                    },
                    "ChkBook App Feedback", // Subject
                    "",                      // Body
                    ["patrick@pdsullivan.com"],    // To
                    null,                    // CC
                    null,                    // BCC
                    false,                   // isHTML
                    null,                    // Attachments
                    null);                   // Attachment Data
            }
        };

        $scope.rateApp = function(){

            if(window.cordova){
                $cordovaGoogleAnalytics.trackEvent('Rate App','rateApp');
            }

            if(AppRate){
                AppRate.preferences.storeAppURL.ios = '927749479';
                AppRate.rateApp();
            }


        };

        $scope.$on('$ionicView.beforeEnter', function(){
            if(window.cordova){
                $cordovaGoogleAnalytics.trackView('About Screen');
            }
        });


    };
})();