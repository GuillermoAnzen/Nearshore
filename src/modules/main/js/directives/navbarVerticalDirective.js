'use strict';
var angular = require("angular");

var navbarDirective = function (){
    return {
        template: require("../../views/navBarVertical.html"),
        controller: 'mainCtrl'
    };
};

module.exports = angular.module("app.main").directive('miNavbar',navbarDirective);