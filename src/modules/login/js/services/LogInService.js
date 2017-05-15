'use strict';
var angular = require('angular');

var LoginService= function ($http, $q){
    return{
    getLogin: getLogin
    }




    function getLogin(username, password){
        var defered=$q.defer();
        var promise= defered.promise;
        var loginUri= "http://54.153.120.183/appsms/login"
        var data = {
             usuario: username,
             password: password
             };
        var config = {
            headers : {'Content-Type': 'application/json; charset=utf-8'}
            }
        $http.post(loginUri,data, config).then(function(response){
            defered.resolve(response.data);
        });
        return promise;
    }

}
module.exports= angular.module("app.login").factory("loginService", LoginService);