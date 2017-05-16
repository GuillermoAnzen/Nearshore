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

    var $this = this;

    $this.navbarMenuView = function(page){
        $location.path("/"+page);
    }
   
};

module.exports = angular.module("app.main").controller('mainCtrl', mainCtrl);