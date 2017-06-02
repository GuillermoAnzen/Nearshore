'use strict';
var angular = require('angular');

var vendorCatService = function ($http, $q, $cookies){

    var server = "http://54.153.120.183/";

    this.getVendors = function(){
        var endpoint = server + "catalogsms/proveedores/";
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
    }

    this.getPlatforms = function(){
        var endpoint = server +"catalogsms/plataformas/";
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
        getVendors: this.getVendors,
        getPlatforms: this.getPlatforms
    };
}
module.exports= angular.module("app.locale").service("vendorCatService", vendorCatService);