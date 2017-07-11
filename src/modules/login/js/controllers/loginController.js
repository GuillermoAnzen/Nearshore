'use strict';
var angular = require('angular');
/**
 * @ngdoc controller
 * @name app.login.controller:loginCtrl
 * @description 
 * Controller for the handle to authentication page
 * @param {undefinided} this This function does not get parameters yet.
 * @returns {undefinided} This function does not return values.
 */

var loginCtrl = function($scope, $location,localeService,$rootScope, $http, loginService,sessionManager, $cookies) {

    if ($cookies.get('IsLogged') == 'true'){
        $location.path("/principal");
    }

    $scope.validateLengthPassword = function(password) {
        console.log("Entra a la funcion");
        var flag = false;
        if (password.length >= 8) {
            flag = true;
        }
        return flag;
    }

    $scope.validateLogin = function() {
        var loginValido= false
       loginService.getLogin($scope.user, $scope.password)
            .then(function(response){
                loginValido= response.data.success;
                    if (loginValido && response.data.data.length >0) {
                        var applicationId = response.headers('applicationid');
                        var username = response.data.data[0].Primer_Nombre + " " + response.data.data[0].Segundo_Nombre + " " + response.data.data[0].Apellido_Paterno;
                        $cookies.put('IsLogged', 'true');
                        $cookies.put('applicationId', applicationId);
                        $cookies.put('username', username);
                        $cookies.put('user', response.data.data[0].Id);
                        $rootScope.UserLogin = true;
                        $rootScope.$on( $scope.user);
                        sessionManager.loged(username);
                        $location.path("/principal");
                        /*Handle show options */
                        var profile = response.data.data[0].Id_Perfil;
                        $cookies.put("adm", false);
                        $cookies.put("app", false);
                        $cookies.put("provs", false);
                        $cookies.put("citiU", false);
                        $cookies.put("cat", false);
                        $cookies.put("showButtons", false);
                        $cookies.put("counter","1");
                        $cookies.put("emp",false);
                        if (profile == 1){
                            $cookies.put("adm", true);
                            $cookies.put("app", true);
                            $cookies.put("provs", true);
                            $cookies.put("citiU", true);
                            $cookies.put("cat", true);
                            $cookies.put("showButtons", true);
                            $cookies.put("emp",true);
                        }else if(profile == 2 || profile == 3){
                            $cookies.put("app", true);
                            $cookies.put("provs", true);
                            $cookies.put("emp",true);
                            $cookies.put("flag", response.data.data[0].idProvedor);
                        }else if(profile == 4){
                            $cookies.put("app", true);
                            $cookies.put("provs", true);
                        }else if (profile == 5){
                            $cookies.put("citiU", true);
                        }
                     }else{
                        $scope.invalidLogin= true;
                        $location.path("/inicio");
                    }
            });


    }
};

module.exports = angular.module("app.login").controller('loginCtrl', loginCtrl);