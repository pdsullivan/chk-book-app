
(function () {
    'use strict';

    angular.module('app').controller('aboutController', ["$scope",'$cordovaAppRate', aboutController]);

    function aboutController($scope,$cordovaAppRate) {
        $scope.version = '1.2';
        $scope.author = 'Patrick Sullivan';

        $scope.sendFeedback =function(){
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
        }

        $scope.rateApp = function(){
            if(AppRate){

                AppRate.preferences.storeAppURL.ios = '927749479';
                AppRate.promptForRating(true);
            }


        }
    };
})();