'use strict';
var angular = require('angular');

var domainService = function ($http, $q, $cookies, constantsService){

    var serverip = constantsService.server();
    
   this.getDomain = function(_index,_rows){
        var server = serverip + "/catalogsms/dominios/domainList";
        var appID = $cookies.get('applicationId');
        var content_type = 'application/json; charset=utf-8';
        var defered=$q.defer();
        var promise= defered.promise;
        var data = {
            index: _index,
            rows: _rows || 1
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
        var server = serverip + "/appsms/aplicaciones/dominio/";
        var appID = $cookies.get('applicationId');
        var content_type = 'application/json; charset=utf-8';
        var defered=$q.defer();
        var promise= defered.promise;
        var data = {
            'index': _index,
            'rows': _rows || 1,
            'idDomain': _idDomain
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
        var server = serverip + "/appsms/aplicaciones/idAplicacion/";
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
        var server = serverip + "/catalogsms/aplicaciones/";
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