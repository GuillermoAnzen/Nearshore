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
var applicationCtrl = function($scope,domainService) {

    var $this = $scope;
    $scope.t = "Test";

    $this.showApplicationTab = function(evt, tabName){
        // Declare all variables
        var i, tabcontent, tablinks;

        // Get all elements with class="tabcontent" and hide them
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }

        // Get all elements with class="tablinks" and remove the class "active"
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        
        if (tabName == "domains"){
            var resp = getDomains();
            console.log(resp);
            $this.domains = resp;
        }

        // Show the current tab, and add an "active" class to the button that opened the tab
        document.getElementById(tabName).style.display = "block";
        evt.currentTarget.className += " active";
    };


    
    /*$this.showApplicationTab = function(tab){
        var content = require("../../views/"+tab+".html")
        $("#tabsApplication").html(content);
        if (tab == 'domains'){
            $scope.c = "Prueba";
            var resp = getDomains();
            console.log(resp);
            $this.domains = resp;
        }
    };*/

    var getDomains = function(){
        var petitionSuccess = false;
        var domains;
        domainService.getDomain().then(function(data){
            petitionSuccess = data.success;
            if (petitionSuccess){
                $scope.domains = data.data;//[{id:1,DESCRIPCION: "DESCRIPCION1"},{id:2,DESCRIPCION:"DESCRIPCION2"}];
                console.log(data.data);
                $("#respons").html("<p> data </p>"+data.data[0].DESCRIPCION);
            }else
                $("#respons").html("<p> Failed Petition </p>");
        });
        return domains;
    };
};

module.exports = angular.module("app.applications").controller('applicationCtrl', applicationCtrl);