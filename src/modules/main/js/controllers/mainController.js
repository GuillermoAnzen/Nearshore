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

var mainCtrl = function($scope, $location,$cookies, $window) {

    var $this = this;

    $this.adm =  $cookies.get("adm") == "true" ? true : false;
    $this.app = $cookies.get("app") == "true" ? true : false;
    $this.provs = $cookies.get("provs") == "true" ? true : false;
    $this.citiU =$cookies.get("citiU") == "true" ? true : false;
    $this.cat = $cookies.get("cat") == "true" ? true : false;
    $this.showButtons = $cookies.get("showButtons") == "true" ? true : false;

    $this.navbarMenuView = function(page){
        $location.path("/"+page);
    }

    if ($cookies.get("counter")!="2"){
        $window.location.reload();
        $cookies.put("counter","2");
    }
};

module.exports = angular.module("app.main").controller('mainCtrl', mainCtrl);