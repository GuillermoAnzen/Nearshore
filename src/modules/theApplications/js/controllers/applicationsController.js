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
    
    $this.showApplicationTab = function(tab){
        var content = require("../../views/"+tab+".html")
        $("#tabsApplication").html(content);
        if (tab == 'domains'){
            $scope.c = "Prueba";
            var resp = getDomains();
            console.log(resp);
            $this.domains = resp;
        }
    };

    var getDomains = function(){
        var petitionSuccess = false;
        var domains;
        domainService.getDomain().then(function(data){
            petitionSuccess = data.success;
            if (petitionSuccess){
                $scope.domains = data.data;
                console.log(data.data);
                $("#respons").html("<p> data </p>"+data.data[0].DESCRIPCION);
            }else
                $("#respons").html("<p> Failed Petition </p>");
        });
        return domains;
    };
};

module.exports = angular.module("app.applications").controller('applicationCtrl', applicationCtrl);