var angular = require("angular");

var userService = function($http, $q, $cookies){
    
    var userUri = 'http://54.153.120.183/catalogsms/usuarios/';
    var contentType = "application/json; charset=utf-8";
    var applicationID = $cookies.get('applicationId');
    var data = "";

    this.getUsers = function(){
        var defered = $q.defer();
        var promise = defered.promise;
        var config = {
            'Content-Type': contentType,
            'ApplicationID': applicationID
        };
        $http.get(userUri, config).then(function(response){
            defered.resolve(response.data);
        });
        return promise;
    };

    return {
        getUsers: this.getUsers
    };
}

module.exports = angular.module("app.locale").service("userService",userService);;