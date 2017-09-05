'use strict';
var angular = require('angular');

var LoginService= function ($http, $q, constantsService){

    var server = constantsService.server();
    return{
    getLogin: getLogin
    }




    function getLogin(username, password){
        var defered=$q.defer();
        var promise= defered.promise;
        var loginUri= server+"/appsms/login"
        var data = {
             usuario: username,
             password: password
             };
        var config = {
            headers : {'Content-Type': 'application/json; charset=utf-8'}
            }
        $http.post(loginUri,data).then(function(data){
            defered.resolve(data);
        });
        return promise;
    }

}
module.exports= angular.module("app.login").factory("loginService", LoginService);