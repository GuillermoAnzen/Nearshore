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

var loginCtrl = function($scope, $location,localeService) {

    $scope.validateLengthPassword = function(password) {
        console.log("Entra a la funcion");
        var flag = false;
        if (password.length >= 8) {
            flag = true;
        }
        return flag;
    }

    $scope.validateLogin = function() {
        var user = "Hector";
        var password = "F2h*f3H_4";
        if (user === document.getElementById("user").value && password === document.getElementById("password").value) {
            $location.path("/principal");
        } else {
            $location.path("/inicio");
        }
    }

    
    $scope.changeLanguage = function (){
        var language = $("#language").val();
        console.log(language);
        localeService.useLanguage.call(language.toString());
    }
};

module.exports = angular.module("app.login").controller('loginCtrl', loginCtrl);