'use strict';
var angular = require('angular');

var countryService = function ($http, $q, $cookies){

    var server = "http://54.153.120.183/";

    this.getCountries = function(_index, _rows){
        var endpoint = server + "catalogsms/paises/list";
        var appID = $cookies.get('applicationId');
        var content_type = 'application/json; charset=utf-8';
        var defered=$q.defer();
        var promise= defered.promise;
        var data = {
            'index': _index,
            'rows': _rows
        };
        var config = {
            headers : { 
                'Content-Type': content_type,
                'ApplicationID': appID
            }
        };
        $http.post(endpoint, data, config).then(function(response){
            defered.resolve(response.data);
        });
        return promise;
    };

    return{
        getCountries: this.getCountries
    };
}
module.exports= angular.module("app.locale").service("countryService", countryService);