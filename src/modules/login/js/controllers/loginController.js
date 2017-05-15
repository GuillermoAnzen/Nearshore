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

var loginCtrl = function($scope, $location,localeService,$rootScope, $http, loginService,sessionManager) {

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
            .then(function(data){
                loginValido= data.success
                        if (loginValido) {
                            $rootScope.UserLogin = true;
                            $rootScope.$on( $scope.user);
                            sessionManager.loged(data.data[0].Primer_Nombre);
                            $location.path("/principal");
                         } else {
                            $location.path("/inicio");
                         }
            });


    }
};

module.exports = angular.module("app.login").controller('loginCtrl', loginCtrl);