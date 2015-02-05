
(function () {
    'use strict';

    angular.module('app').controller('aboutController', [
        "$scope",
        '$cordovaAppRate',
        '$cordovaGoogleAnalytics',
        '$cordovaAppVersion',
        '$cordovaInAppBrowser',
        '$rootScope',
        aboutController]);

    function aboutController($scope,
                             $cordovaAppRate,
                             $cordovaGoogleAnalytics,
                             $cordovaAppVersion,
                             $cordovaInAppBrowser,
                             $rootScope) {
        $scope.version = 'n/a';
        $scope.author = 'Patrick Sullivan';

        var init = function(){
            if(window.cordova){
                $cordovaAppVersion.getAppVersion().then(function (version) {
                    $scope.version =  version;
                });
            }
        }

        $scope.authorClick = function(){
            var options = {
                location: 'no',
                clearcache: 'yes',
                toolbarposition: 'top',
                toolbar: 'yes'
            };
            if(window.cordova){


                $cordovaInAppBrowser.open('http://www.pdsullivan.com', '_system', options)
                    .then(function(event) {
                        // success
                    })
                    .catch(function(event) {
                        // error
                    });
            }
        };

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


            if(window.cordova && AppRate){
                AppRate.preferences.storeAppURL.ios = '927749479';
                AppRate.navigateToAppStore();
            }

            if(window.cordova){
                $cordovaGoogleAnalytics.trackEvent('Rate App','rateApp');
            }

        };

        $scope.$on('$ionicView.beforeEnter', function(){
            if(window.cordova){
                $cordovaGoogleAnalytics.trackView('About Screen');
            }
        });


        init();

    };
})();