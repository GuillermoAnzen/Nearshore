var angular= require('angular');

var plataformsServices= function($http,$q,$cookies,constantsService){

    var server= constantsService.server();

    this.getallPlataforms = function()
    {
        var endpoint= server + "/catalogsms/plataformas/";
        var applicationID= $cookies.get('applicationId');
        var content_type='application/json; charset=utf-8';
        var defered= $q.defer();
        var promise= defered.promise;
        var config= {headers:{
            'Content-Type': content_type,
            'ApplicationID': applicationID
            }
            };
        $http.get(endpoint, config).then(function(response){
            defered.resolve(response.data);
        });
        return promise;
    };

    this.addNewPlataform= function(descripcion, comentarios){
        var endpoint= server+ "/catalogsms/plataformas/";
        var applicationId= $cookies.get('applicationId');
        var content_type= 'application/json; charset=utf-8';
        var defered=$q.defer();
        var promise= defered.promise;
        var config={headers:{
            'Content-Type': content_type,
            'ApplicationID': applicationId
        }};
        var data={
            "comentarios": comentarios,
            "descripcion": descripcion
        };
        $http.post(endpoint, data, config).then(function(response){
            defered.resolve(response.data);
        });
        return promise;
    };

        this.getPlataformById= function(plataformId){
        var endpoint= server + "/catalogsms/plataformas/"+ plataformId;
        var applicationId= $cookies.get('applicationId');
        var content_type='application/json; charset=utf-8';
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
    };
        this.editPlataform= function(plataformId,descripcion, comentarios){
            var endpoint= server + "/catalogsms/plataformas/" + plataformId;
            var applicationId= $cookies.get('applicationId');
            var content_type='application/json; charset=utf-8';
            var defered= $q.defer();
            var promise= defered.promise;
            var data={
                        "comentarios": comentarios,
                        "descripcion": descripcion
                    };
            var config={headers:{
                                'Content-Type': content_type,
                                'ApplicationID': applicationId
            }};
            $http.put(endpoint,data,config).then(function(response){
                defered.resolve(response.data);
            });
            return promise;
        }
        this.deletePlataform= function(plataformId){
            var endpoint= server + "/catalogsms/plataformas/" + plataformId;
            var applicationId= $cookies.get('applicationId');
            var content_type= 'application/json; charset=utf-8';
            var defered= $q.defer();
            var promise= defered.promise;
            var config={headers:{
                                'Content-Type': content_type,
                                'ApplicationID': applicationId
            }};

            $http.delete(endpoint,config).then(function(response){
                defered.resolve(response.data);
            });
            return promise;
        }
    return{
        getallPlataforms: this.getallPlataforms,
        addNewPlataform:this.addNewPlataform,
        getPlataformById: this.getPlataformById,
        editPlataform:this.editPlataform,
        deletePlataform: this.deletePlataform
    };
}
module.exports= angular.module("app.catalogs").service("plataformServices", plataformsServices);