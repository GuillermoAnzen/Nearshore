var angular = require("angular");

var userService = function($http, $q, $cookies){
    
    var getAllusersUri = 'http://54.153.120.183/catalogsms/usuarios/';
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

    return {
        getUsers: this.getUsers
    };
}

module.exports = angular.module("app.locale").service("userService",userService);;