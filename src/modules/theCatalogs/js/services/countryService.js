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

    this.getCountryById= function(countryId){
        var endpoint= server + "catalogsms/paises/" + countryId;
        var applicationId= $cookies.get('applicationId');
        var content_type= 'application/json; charset=utf-8';
        var defered= $q.defer();
        var promise= defered.promise;
        var config={
            headers:{
                            'Content-Type': content_type,
                            'ApplicationID': applicationId
            }
        };
        $http.get(endpoint,config).then(function(response){
            defered.resolve(response.data);
        });
        return promise;
    }
    this.editCountry= function(id, name){
        var endpoint= server + "catalogsms/paises/" + id;
        var applicationId= $cookies.get('applicationId');
        var content_type='application/json; charset=utf-8';
        var defered= $q.defer();
        var promise= defered.promise;
        var data={'descripcion': name }
        var config={ headers:{
                                                'Content-Type': content_type,
                                                'ApplicationID': applicationId
                                }};
        $http.put(endpoint,data, config).then(function(response){
            defered.resolve(response.data);
        });
        return promise;
    }
    this.deleteCountry= function(id){
        var endopoint= server + "catalogsms/paises/" + id;
        var applicationId= $cookies.get('applicationId');
        var content_type='application/json; charset=utf-8';
        var defered=$q.defer();
        var promise= defered.promise;
        var config={ headers:{
                               'Content-Type': content_type,
                               'ApplicationID': applicationId
                                                   }};
        $http.delete(endopoint,config).then(function(response){
            defered.resolve(response.data);
        });
        return promise;
    }

    return{
        getCountries: this.getCountries,
        getCountryById:this.getCountryById,
        editCountry:this.editCountry,
        deleteCountry:this.deleteCountry
    };
}
module.exports= angular.module("app.locale").service("countryService", countryService);