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
var catalogCtrl = function($scope, $location,localeService, $cookies, vendorCatService) {

     $scope.currentPage = 1;
     $scope.pageSize = 10;
     $scope.vendorsList=[];
     $scope.totalVendors= 0;

     getResultsPage();

     function getResultsPage(){
     vendorCatService.getVendors().then(function(response){
        if(response.success){
            $scope.vendorsList=[];
            $scope.totalVendors= response.data.length;
            for(var i=0; i<response.data.length; i++ ){
            var _id= parseInt(response.data[i].ID);
            var vendor={id: _id, nombre: response.data[i].DESCRIPCION};
            $scope.vendorsList.push(vendor);
            }
        }else{
             $scope.error="Hubo un error en la conexión con la base de datos";
             $console.log('Error');
        }
     });

     }
    if ($cookies.get("cat") != "true"){
        $location.path("/principal");
    }

    var $this = $scope;
    
    $this.showCatalogTab = function(evt, tabName){
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
        
        // Show the current tab, and add an "active" class to the button that opened the tab
        document.getElementById(tabName).style.display = "block";
    };
};

module.exports = angular.module("app.catalogs").controller('catalogCtrl', catalogCtrl);