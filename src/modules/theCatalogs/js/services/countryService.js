'use strict';
var angular = require('angular');

var countryService = function ($http, $q, $cookies){

    var server = "http://54.153.120.183/";

    this.getCountries = function(){
        var endpoint = server + "catalogsms/paises/";
        var appID = $cookies.get('applicationId');
        var content_type = 'application/json; charset=utf-8';
        var defered=$q.defer();
        var promise= defered.promise;
        var config = {
            headers : { 
                'Content-Type': content_type,
                'ApplicationID': appID
            }
        };
        $http.get(endpoint, config).then(function(response){
            defered.resolve(response.data);
        });
        return promise;
    };

    return{
        getCountries: this.getCountries
    };
}
module.exports= angular.module("app.locale").service("countryService", countryService);