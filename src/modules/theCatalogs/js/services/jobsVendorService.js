'use strict';
var angular = require('angular');

var jobsVendorService = function ($http, $q, $cookies, constantsService){

    var server = constantsService.server();

    this.getJobs = function(){
        var endpoint = server + "/catalogsms/puestos/proveedores/";
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
        getJobs: this.getJobs
    };
}
module.exports= angular.module("app.locale").service("jobsVendorService", jobsVendorService);