'use strict';
var angular = require('angular');

var vendorCatService = function ($http, $q, $cookies){

    var server = "http://54.153.120.183/";

    this.addVendor = function(descripcion){
        var endpoint= server + "catalogsms/proveedores/";
        var applicationId= $cookies.get('applicationId');
        var  content_type='application/json; charset=utf-8';
        var defered = $q.defer();
        var promise= defered.promise;
        var config = {
             headers : {
                            'Content-Type': content_type,
                            'ApplicationID': applicationId
                        }
        };
        var data={
            "descripcion":descripcion
        }
        $http.post(endpoint, data, config).then(function(response){
            defered.resolve(response.data);
        });
        return promise;
    }

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
    
    this.getProviders = function(_index,_size){
        var endpoint = server + "catalogsms/proveedores/providers/";
        var appID = $cookies.get('applicationId');
        var content_type = 'application/json; charset=utf-8';
        var defered=$q.defer();
        var promise= defered.promise;
        var data = {
            'index': _index,
            'rows': _size || 1
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

    this.getDetailsProvider = function(_index, _rows, _id){
        var endpoint = server + "catalogsms/proveedores/detailsProvider/";
        var appID = $cookies.get('applicationId');
        var content_type = 'application/json; charset=utf-8';
        var defered=$q.defer();
        var promise= defered.promise;
        var data = {
            'index': _index,
            'rows': _rows,
            'idProvider': _id 
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
    this.getProviderById= function(idVendor){
    var endpoint= server + "catalogsms/proveedores/" + idVendor.toString();
    var applicationId= $cookies.get('applicationId');
    var content_type= 'application/json; charset=utf-8';
    var defered= $q.defer();
    var promise= defered.promise;
    var config={
              headers : {
                          'Content-Type': content_type,
                          'ApplicationID': applicationId
     }};
     $http.get(endpoint,config).then(function(response){
        defered.resolve(response.data);
     });
        return promise;
    }
    this.deleteProvider= function(idVendor){
        var endpoint= server +"catalogsms/proveedores/" + idVendor.toString();
        var applicationId= $cookies.get('applicationId');
        var content_type= 'application/json; charset=utf-8';
        var defered= $q.defer();
        var promise= defered.promise;
        var config={
                    headers : {
                                  'Content-Type': content_type,
                                  'ApplicationID': applicationId
             }};
        $http.delete(endpoint,config).then(function(response){
            defered.resolve(response.data);
        });
        return promise;
    }
    this.updateVendors= function(idVendor, descripcion)
    {
        var endpoint= server + "catalogsms/proveedores/" + idVendor;
        var applicationId= $cookies.get('applicationId');
        var content_type= 'application/json; charset=utf-8';
        var defered= $q.defer();
        var promise= defered.promise;
        var config={headers:{
            'Content-Type': content_type,
            'ApplicationID': applicationId
        }};
        var data= {"descripcion": descripcion};
        $http.put(endpoint, data,config).then(function(response){
            defered.resolve(response.data);
        });
            return promise;
    }
    return{
        getVendors: this.getVendors,
        getPlatforms: this.getPlatforms,
        getProviders: this.getProviders,
        getDetailsProvider: this.getDetailsProvider,
        addVendor: this.addVendor,
        getProviderById: this.getProviderById,
        deleteProvider: this.deleteProvider,
        updateVendors: this.updateVendors
    };
}
module.exports= angular.module("app.locale").service("vendorCatService", vendorCatService);