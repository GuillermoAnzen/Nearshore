'use strict';
var angular = require('angular');

var domainService = function ($http, $q, $cookies){
    
   this.getDomain = function(){
        var server = "http://54.153.120.183/catalogsms/dominios/";
        var appID = $cookies.get('applicationId');
        var content_type = 'application/json; charset=utf-8';
        var defered=$q.defer();
        var promise= defered.promise;
        var data = "";
        var config = {
            headers : { 
                'Content-Type': content_type,
                'ApplicationID': appID
            }
        };
        $http.get(server, config).then(function(response){
            defered.resolve(response.data);
        });
        return promise;
    }

    return{
        getDomain: this.getDomain
    };
}
module.exports= angular.module("app.locale").service("domainService", domainService);