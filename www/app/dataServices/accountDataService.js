/**
 * Created by patricksullivan on 12/1/14.
 */

/**
 * Created by patricksullivan on 12/1/14.
 */


(function () {
    'use strict';

    var serviceId = 'accountDataService';

    angular.module('app').factory(serviceId, ['$http','$q', accountDataService]);

    function accountDataService($http,$q) {


        var service = {
            getTransactions: getTransactions,
            getAccounts: getAccounts
        };

        return service;

        function getAccounts() {

            var accounts = null;
            var accountsString = window.localStorage['accounts'];
            console.log(accountsString);
            if(accountsString) {
                accounts = angular.fromJson(accountsString);
            }
            return $q.when(accounts);
        }

        function getTransactions(account) {
            var transString = window.localStorage[account.id+'transactions'];
            var transactions = null;
            if(transString) {
                transactions = angular.fromJson(transString);
            }
            return $q.when(transactions);
        }


    }
})();
