var angular = require('angular');

var logoutService= function ($http, $q, $cookies){
    return {
        logout: logout
    }

    function logout(applicationId){
        var defered=$q.defer();
        var promise= defered.promise;

        var logoutUri= "http://54.153.120.183/logout";

        var config={
        headers : {'Content-Type': 'application/json; charset=utf-8',
                    'ApplicationID': applicationId}
        }
        $http.post(logoutUri,{},config).then(function(response){
             defered.resolve(response);
        });
        return promise;
    }


}
module.exports=angular.module("app.navbar").factory("logoutService",logoutService);