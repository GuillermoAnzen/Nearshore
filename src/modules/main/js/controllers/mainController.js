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
        // Declare all variables
        var i, tablinks;

        tablinks = $(".navbar-vertical li");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].removeAttribute("class");
        }
        $("#"+page).attr("class","active");
    }

    function init(){

        var i, tablinks,page;
        if (window.location.href.indexOf("/users")!=-1)
            page = "users";
        else if (window.location.href.indexOf("/applications")!=-1)
            page = "applications";
        else if (window.location.href.indexOf("/providers")!=-1)
            page = "providers";
        else if (window.location.href.indexOf("/citiUsers")!=-1)
            page = "citiUsers";
        else if (window.location.href.indexOf("/catalogs")!=-1)
            page = "catalogs";

        tablinks = $(".navbar-vertical li");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].removeAttribute("class");
        }
        $("#"+page).attr("class","active");
    }

    if ($cookies.get("counter")!="2"){
        $window.location.reload();
        $cookies.put("counter","2");
    }

    init();
};

module.exports = angular.module("app.main").controller('mainCtrl', mainCtrl);