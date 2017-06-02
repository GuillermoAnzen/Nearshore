'use strict';
var angular = require('angular');

var domainService = function ($http, $q, $cookies){
    
   this.getDomain = function(_index,_rows){
        var server = "http://54.153.120.183/catalogsms/dominios/domainList";
        var appID = $cookies.get('applicationId');
        var content_type = 'application/json; charset=utf-8';
        var defered=$q.defer();
        var promise= defered.promise;
        var data = {
            index: _index,
            rows: _rows
        };
        var config = {
            headers : { 
                'Content-Type': content_type,
                'ApplicationID': appID
            }
        };
        $http.post(server, data, config).then(function(response){
            defered.resolve(response.data);
        });
        return promise;
    }

    /* APPLICATION PER DOMAIN */
    this.getApplicationDomain = function(_index,_rows,_idDomain){
        var server = "http://54.153.120.183/appsms/aplicaciones/dominio/";
        var appID = $cookies.get('applicationId');
        var content_type = 'application/json; charset=utf-8';
        var defered=$q.defer();
        var promise= defered.promise;
        var data = {
            index: _index,
            rows: _rows,
            idDomain: _idDomain
        };
        var config = {
            headers : { 
                'Content-Type': content_type,
                'ApplicationID': appID
            }
        };
        $http.post(server, data, config).then(function(response){
            defered.resolve(response.data);
        });
        return promise;
    }

    /* DETAILS APPLICATION PER ID */
    this.getApplicationDetails = function(_id){
        var server = "http://54.153.120.183/appsms/aplicaciones/idAplicacion/";
        var appID = $cookies.get('applicationId');
        var content_type = 'application/json; charset=utf-8';
        var defered=$q.defer();
        var promise= defered.promise;
        server = server+_id;
        var data = {
            id: _id
        };
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

    this.getAllApplicationDomain = function(){
        var server = "http://54.153.120.183/catalogsms/aplicaciones/";
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
        $http.get(server, config).then(function(response){
            defered.resolve(response.data);
        });
        return promise;
    };

    return{
        getDomain: this.getDomain,
        getApplicationDomain: this.getApplicationDomain,
        getApplicationDetails: this.getApplicationDetails,
        getAllApplicationDomain: this.getAllApplicationDomain
    };
}
module.exports= angular.module("app.locale").service("domainService", domainService);