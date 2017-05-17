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
var catalogCtrl = function($scope, $location,localeService) {

    var $this = $scope;
    
    $this.showApplicationTab = function(tab){
        var content = require("../../views/"+tab+".html")
        $("#tabsApplication").html(content);
    };

    $this.showOtherView = function(){
        console.log("showOtherView");
    }
};

module.exports = angular.module("app.catalogs").controller('catalogCtrl', catalogCtrl);