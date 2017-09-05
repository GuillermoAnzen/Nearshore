var angular= require('angular');

var domainServices= function($http, $q, $cookies, constantsService){
    var server=constantsService.server();

    this.getAllDomains= function(index, rows){
        var endpoint= server + "/catalogsms/dominios/domainList";
        var applicationId= $cookies.get('applicationId');
        var content_type = 'application/json; charset=utf-8';
        var defered=$q.defer();
        var promise= defered.promise;
        var data  ={
            'index':  index,
            'rows': rows
        };
        var config = {
            headers : {
                'Content-Type': content_type,
                'ApplicationID': applicationId
            }
        };
        $http.post(endpoint,data,config).then(function(response){
            defered.resolve(response.data);
        });
        return promise;
    };

    this.addNewDomain= function(name){
      var endpoint= server + "/catalogsms/dominios/";
      var applicationId= $cookies.get('applicationId');
      var content_type= 'application/json; charset=utf-8';
      var defered= $q.defer();
      var promise=defered.promise;
      var data={
        'descripcion': name
      };
      var config={headers:{ 'Content-Type': content_type,
                                           'ApplicationID': applicationId}};
      $http.post(endpoint,data, config).then(function(response){
        defered.resolve(response.data);
      });
      return promise;
    }
    this.getDomainById= function(id){
        var endpoint= server + "/catalogsms/dominios/" + id;
        var applicationId= $cookies.get('applicationId');
        var content_type= 'application/json; charset=utf-8';
        var defered= $q.defer();
        var promise= defered.promise;
        var config={headers:{ 'Content-Type': content_type,
                   'ApplicationID': applicationId}};
        $http.get(endpoint,config).then(function(response){
            defered.resolve(response.data);
        });

        return promise;
    }
    this.editDomain= function(id, name){
        var endpoint= server + "/catalogsms/dominios/" + id;
        var applicationId= $cookies.get('applicationId');
        var content_type= 'application/json; charset=utf-8';
        var defered= $q.defer();
        var promise= defered.promise;
        var config= {headers:{ 'Content-Type': content_type,
                                    'ApplicationID': applicationId}};
        var data={
            'descripcion': name
        }
        $http.put(endpoint,data,config).then(function(response){
            defered.resolve(response.data);
        });

        return promise;
    }

    this.deleteDomain= function(id){
        var endpoint= server + "/catalogsms/dominios/" + id;
        var applicationId= $cookies.get('applicationId');
        var content_type= 'application/json; charset=utf-8';
        var defered= $q.defer();
        var promise= defered.promise;
        var config= {headers:{ 'Content-Type': content_type,
                                            'ApplicationID': applicationId}};
        $http.delete(endpoint,config).then(function(response){
            defered.resolve(response.data);
        });
        return promise;
    }


    return{
        getAllDomains:this.getAllDomains,
        addNewDomain:this.addNewDomain,
        getDomainById:this.getDomainById,
        editDomain:this.editDomain,
        deleteDomain: this.deleteDomain
    };
}
module.exports= angular.module("app.catalogs").service("domainServices", domainServices );