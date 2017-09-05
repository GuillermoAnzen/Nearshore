'use strict';
var angular = require('angular');

var CitiesService = function ($http, $q, $cookies, constantsService){

    var server = constantsService.server();

    this.getCities = function(){
        var endpoint = server + "/catalogsms/ciudades/";
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
    this.getCitiesById= function(id){
        var endpoint= server + "/catalogsms/ciudades/" + id;
        var applicationId= $cookies.get('applicationId');
        var content_type= 'application/json; charset=utf-8';
        var defered= $q.defer();
        var promise= defered.promise;
        var config={
            headers:{
                'Content-Type': content_type,
                'ApplicationID': applicationId
            }};
        $http.get(endpoint,config).then(function(response){
            defered.resolve(response.data);
        });
        return promise;
    }

    this.getCitiesByIdCountry = function(_id,_index, _rows){
        var endpoint = server + "/catalogsms/ciudades/paises/"+ _id;
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
    this.addCitys= function(paisId, ciudad){
        var endpoint= server + "/catalogsms/ciudades/paises/"+paisId+"/ciudades";
        var applicationId= $cookies.get('applicationId');
        var content_type= 'application/json; charset=utf-8';
        var defered= $q.defer();
        var promise= defered.promise;
        var data={
            'descripcion':ciudad
        };
        var config = {
               headers : {
                       'Content-Type': content_type,
                       'ApplicationID': applicationId
                   }
        };
        $http.post(endpoint,data, config).then(function(response){
            defered.resolve(response.data);
        });
        return promise;
    }
    this.updateCity= function(paisId, ciudadname, ciudadId){
        var endpoint= server + "/catalogsms/ciudades/" + ciudadId;
        var applicationId= $cookies.get('applicationId');
        var content_type= 'application/json; charset=utf-8';
        var defered= $q.defer();
        var promise= defered.promise;
        var data={
            'pais':{
                'id': paisId
            },
            'descripcion': ciudadname
        };
        var config = {
            headers : {
                  'Content-Type': content_type,
                  'ApplicationID': applicationId
                   }
        };
        $http.put(endpoint, data, config).then(function(response){
            defered.resolve(response.data);
        });
        return promise;
    }
    this.deleteCity= function(idCity){
        var endpoint= server + "/catalogsms/ciudades/"+ idCity;
        var applicationId= $cookies.get('applicationId');
        var content_type='application/json; charset=utf-8' ;
        var defered= $q.defer();
        var promise= defered.promise;
        var config= {
            headers : {
                  'Content-Type': content_type,
                  'ApplicationID': applicationId
                   }
        };
        $http.delete(endpoint,config).then(function(response){
            defered.resolve(response.data);
        });
        return promise;
    }

    return{
        addCitys:this.addCitys,
        getCities: this.getCities,
        getCitiesByIdCountry: this.getCitiesByIdCountry,
        getCitiesById:this.getCitiesById,
        updateCity: this.updateCity,
        deleteCity: this.deleteCity
    };
}
module.exports= angular.module("app.locale").service("CitiesService", CitiesService);