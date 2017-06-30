'use strict';
var angular = require('angular');

var employeesCitiService = function ($http, $q, $cookies){

    var server = "http://54.153.120.183/";

    this.getAnalistas = function(){
        var endpoint = server + "catalogsms/empleados/analistas";
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

    this.getLideres = function(){
        var endpoint = server + "catalogsms/empleados/lideres";
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
    
    this.getGerentes = function(){
        var endpoint = server + "catalogsms/empleados/gerentes";
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

    this.getEmployeesByDomain = function(idDomain,_index,_rows){
        var endpoint = server + "catalogsms/empleados/citiDomainId/";
        var appID = $cookies.get('applicationId');
        var content_type = 'application/json; charset=utf-8';
        var defered = $q.defer();
        var promise = defered.promise;
        var data = {
            'index': _index,
            'rows': _rows,
            'idDomain': idDomain
        };
        var config = {
            'headers': {
                'Content-Type': content_type,
                'ApplicationID': appID
            }
        };
        $http.post(endpoint, data, config).then(function(response){
            defered.resolve(response.data);
        });
        return promise;
    };

    this.getDetailsEMployee = function(_id){
        var endpoint = server + "catalogsms/empleados/citi/"+_id;
        var appID = $cookies.get('applicationId');
        var content_type = 'application/json; charset=utf-8';
        var defered = $q.defer();
        var promise = defered.promise;
        var config = {
            'headers': {
                'content_type': content_type,
                'ApplicationID': appID
            }
        };
        $http.get(endpoint, config).then(function(response){
            defered.resolve(response.data);
        });
        return promise;
    };

    this.getAppsByCitiEmployee = function(_index, _rows, _id){
        var endpoint = server + "catalogsms/empleados/appsEmpleadoCiti/";
        var appID = $cookies.get('applicationId');
        var content_type = 'application/json; charset=utf-8';
        var defered = $q.defer();
        var promise = defered.promise;
        var data = {
            index: _index,
            rows: _rows || 1,
            soeId: _id
        };
        var config = {
            'headers': {
                'content_type': content_type,
                'ApplicationID': appID
            }
        };
        $http.post(endpoint, data, config).then(function(response){
            defered.resolve(response.data);
        });
        return promise;
    };

    return{
        getGerentes: this.getGerentes,
        getLideres: this.getLideres,
        getAnalistas: this.getAnalistas,
        getEmployeesByDomain: this.getEmployeesByDomain,
        getDetailsEMployee: this.getDetailsEMployee,
        getAppsByCitiEmployee: this.getAppsByCitiEmployee
    };
}
module.exports= angular.module("app.locale").service("employeesCitiService", employeesCitiService);