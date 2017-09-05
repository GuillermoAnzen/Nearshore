'use strict';
var angular = require('angular');

var jobsCitiService = function ($http, $q, $cookies, constantsService){

    var server = constantsService.server();

    this.getJobs = function(_index, _rows){
        var endpoint = server + "/catalogsms/puestos/citi/list";
        var appID = $cookies.get('applicationId');
        var content_type = 'application/json; charset=utf-8';
        var defered=$q.defer();
        var promise= defered.promise;
        var data  ={
            'index':  _index,
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
    this.addNewJob= function(name){
        var endpoint= server + "/catalogsms/puestos/citi/";
        var applicationId= $cookies.get('applicationId');
        var content_type= 'application/json; charset=utf-8';
        var defered= $q.defer();
        var promise= defered.promise;
        var data= {
            'descripcion': name
        };
        var config= {headers:{
                'Content-Type': content_type,
                'ApplicationID':applicationId
        }};
        $http.post(endpoint, data, config).then(function(response){
            defered.resolve(response.data);
        });
        return promise
    }
    this.getProfileById= function(profileId){
        var endpoint= server + "/catalogsms/puestos/citi/" + profileId;
        var applicationId= $cookies.get('applicationId');
        var content_type= 'application/json; charset=utf-8';
        var defered= $q.defer();
        var promise= defered.promise;
        var config={headers:{
                'Content-Type': content_type,
                'ApplicationID': applicationId
            }};
        $http.get(endpoint,config).then(function(response){
            defered.resolve(response.data);
        });
        return promise;
    }
    this.updateProfile= function(profileId, descripcion){
        var endpoint= server + "/catalogsms/puestos/citi/"+ profileId;
        var applicationId= $cookies.get('applicationId');
        var content_type='application/json; charset=utf-8';
        var defered= $q.defer();
        var promise= defered.promise;
        var config ={headers:{'Content-Type': content_type,
        'ApplicationID': applicationId
        }};
        var data= {'descripcion':descripcion};
        $http.put(endpoint,data,config).then(function(response){
            defered.resolve(response.data);
        });
        return promise;
    }
    this.deleteProfile= function(profileId){
        var endpoint= server + "/catalogsms/puestos/citi/" + profileId;
        var applicationId= $cookies.get('applicationId');
        var content_type='application/json; charset=utf-8';
        var defered= $q.defer();
        var promise= defered.promise;
        var config={headers:{'Content-Type': content_type,
                           'ApplicationID': applicationId
                           }};
        $http.delete(endpoint, config).then(function(response){
            defered.resolve(response.data);
        });
        return promise;
    }

    return{
        addNewJob: this.addNewJob,
        getJobs: this.getJobs,
        getProfileById: this.getProfileById,
        updateProfile:this.updateProfile,
        deleteProfile:this.deleteProfile
    };
}
module.exports= angular.module("app.locale").service("jobsCitiService", jobsCitiService);