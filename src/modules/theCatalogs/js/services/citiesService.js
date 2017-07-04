'use strict';
var angular = require('angular');

var CitiesService = function ($http, $q, $cookies){

    var server = "http://54.153.120.183/";

    this.getCities = function(){
        var endpoint = server + "catalogsms/ciudades/";
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

    this.getCitiesId = function(_id,_index, _rows){
        var endpoint = server + "catalogsms/ciudades/paises/"+ _id;
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
        getCities: this.getCities,
        getCitiesId: this.getCitiesId
    };
}
module.exports= angular.module("app.locale").service("CitiesService", CitiesService);