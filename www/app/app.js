// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'ngCordova'])

    .run(function($ionicPlatform, $cordovaStatusbar,$cordovaGoogleAnalytics) {

        $ionicPlatform.ready(function() {
            //Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            //for form inputs)


            //UA-59328829-1
            if(window.cordova){
                $cordovaGoogleAnalytics.startTrackerWithId('UA-59328829-1');
            }


            if(window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

            }
            if(window.StatusBar) {
                StatusBar.styleDefault();
            }




        });
    })


    .factory('$exceptionHandler', ['$injector', function($injector) {

        var loggingService;
        //var ;
        return function(exception, cause) {
            loggingService = loggingService || $injector.get('loggingService');
            exception.message += ' (caused by "' + cause + '")';
            loggingService.logError(exception, exception.message);
            throw exception;
        };
    }])

    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('app', {
                url: "/app",
                abstract: true,
                templateUrl: "app/menu/menu.html",
                controller: 'menuController'
            })
            .state('app.accounts', {
                url: "/accounts",
                views: {
                    'menuContent' :{
                        templateUrl: "app/accounts/accounts.html"
                    }
                },
                controller: 'accountsController'
            })
            .state('app.accountTransactions', {
                url: "/accountTransactions/:accountName",
                views: {
                    'menuContent': {
                        templateUrl: "app/accounts/accountTransactions.html"
                    }
                },
                controller: 'accountTransactionsController'
            })
            .state('app.about', {
                url: "/about",
                views: {
                    'menuContent' :{
                        templateUrl: "app/about/about.html"
                    }
                },
                controller: 'aboutController'
            })
            .state('app.settings', {
                url: "/settings",
                views: {
                    'menuContent' :{
                        templateUrl: "app/settings/settings.html"
                    }
                },
                controller: 'settingsController'
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/accounts');
    });


