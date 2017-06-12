var angular = require("angular");

var userService = function($http, $q, $cookies){
    
    var getAllusersUri = 'http://54.153.120.183/catalogsms/usuarios/';
    var getAllProfilesUri='http://54.153.120.183/catalogsms/perfiles/';
    var getAllDomainsUri='http://54.153.120.183/catalogsms/dominios/domainList';
    var getAllVendorsUri= 'http://54.153.120.183/catalogsms/proveedores/';
    var newUserUri='http://54.153.120.183/catalogsms/usuarios/newUser';
    var contentType = "application/json; charset=utf-8";
    var data = "";

    this.getUsers = function(index, rows){
        var defered = $q.defer();
        var promise = defered.promise;
        var data={
            index: index,
            rows: rows
        };
        var applicationId=$cookies.get('applicationId');
        var config = {
        headers : {'Content-Type': 'application/json; charset=utf-8',
                    'ApplicationID': applicationId
        }};
        $http.post(getAllusersUri,data,config).then(function(response){
            defered.resolve(response.data);
        });
        return promise;
    };

     function getUserById(id){
        var defered= $q.defer();
        var promise= defered.promise;
        var applicationId= $cookies.get('applicationId');
        var config={
        headers:{ 'Content-Type': 'application/json; charset=utf-8',
                    'ApplicationID': applicationId
                 }};
        var getUserByIdUri = getAllusersUri + id.toString();
        $http.get(getUserByIdUri, config).then(function(response){
            defered.resolve(response.data);
        });
        return promise;
     };

     function updateUser(id, firstName, secondName, lastName, lastMotherName, email, profile, clave, active){
        var defered= $q.defer();
        var promise= defered.promise;
        var applicationId= cookies.get('aplicationId');
        var config={
        headers:{ 'Content-Type': 'application/json; charset=utf-8',
                  'ApplicationID': applicationId
                  }};
        var updateUserUri= getAllusersUri + id.toString();
        var data={
            perfil: {
                id: profile
            },
            email: email,
            primerNombre: firstName,
            segundoNombre: secondName,
            apellidoPaterno: lastName,
            apellidoMaterno: lastMotherName,
            clave: clave,
            activo: active}
        $http.put(updateUserUri,data, config).then(function(response){
                defered.resolve(response.data);
            });
            return promise
        };

    return {
        getUsers: this.getUsers,
        getAllProfiles: getAllProfiles,
        newUser:newUser,
        getUserById:getUserById,
        updateUser: updateUser
    };

        function getAllProfiles(){
        var defered= $q.defer();
        var promise= defered.promise;
        var applicationId= $cookies.get('applicationId');
        var config={
        headers:{ 'Content-Type': 'application/json; charset=utf-8',
                   'ApplicationID': applicationId
                   }};
        $http.get(getAllProfilesUri,config).then(function(response){
            defered.resolve(response.data);
        });
        return promise;
    };


        function newUser(firstName, secondName, lastName, lastMotherName, email, profile, clave){
            var defered= $q.defer();
            var promise= defered.promise;
            var applicationId= $cookies.get('applicationId');
            var config = {
            headers:{'Content-Type': 'application/json; charset=utf-8',
                     'ApplicationID': applicationId
            }};
            var data={
                        perfil: {
                      		id: profile
                      	},
                      	email: email,
                        primerNombre: firstName,
                        segundoNombre: secondName,
                        apellidoPaterno: lastName,
                        apellidoMaterno: lastMotherName,
                        clave: clave,
                        activo: 1

            }
            $http.post(newUserUri, data, config).then(function(response){
                defered.resolve(response.data);
            });
            return promise;
        }

}

module.exports = angular.module("app.locale").service("userService",userService);;