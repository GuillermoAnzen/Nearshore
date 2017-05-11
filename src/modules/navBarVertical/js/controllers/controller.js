'use strict'

var angular = require('angular');

var controllerNavbarV = function ($scope,$location, localeService) {
    console.log("LoadController NavBarV");
    $scope.loadNavBarVertical = function(){
        
        /*var navbarVertical = $("#navbar-vertical");
        console.log("NavBarLoad"+navbarVertical);
        navbarVertical.html(require("../../views/navBarVertical.html"));*/
    };
};

module.exports = angular.module("app.navbarVertical").controller("controllerNavbarV", controllerNavbarV);