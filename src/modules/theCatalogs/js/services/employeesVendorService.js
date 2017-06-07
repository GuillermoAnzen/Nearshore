'use strict';
var angular = require('angular');

var employeesVendorService = function ($http, $q, $cookies){

    var server = "http://54.153.120.183/";

    this.getEmployeesPerVendor = function(_idVendor){
        var endpoint = server + "catalogsms/empProvider/employeesVendor/"+_idVendor;
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
        getEmployeesPerVendor: this.getEmployeesPerVendor
    };
}
module.exports= angular.module("app.locale").service("employeesVendorService", employeesVendorService);