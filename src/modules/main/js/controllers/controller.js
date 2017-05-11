'use strict';
var angular = require('angular');
/**
 * @ngdoc controller
 * @name app.login.controller:mainController
 * @description 
 * Controller 
 * @param {undefinided} this This function does not get parameters yet.
 * @returns {undefinided} This function does not return values.
 */

var mainCtrl = function($scope, $location) {

    this.changeView = function(){
        $location.path("/change");
    };
   
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
};

module.exports = angular.module("app.main").controller('mainCtrl', mainCtrl);