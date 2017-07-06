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
var catalogCtrl = function($scope, $location,localeService, $cookies, vendorCatService, $window) {

     $scope.currentPage = 1;
     $scope.pageSize = 10;
     $scope.vendorsList=[];
     $scope.totalVendors= 0;
     $scope.activeModifyButton=true;

    $scope.hideSuccessDeleteAlert= function(){
       $scope.showSuccessDelete= false;
       }

     $scope.hideSuccessAddAlert= function(){
       $scope.showSuccessAdd= false;
     }

     $scope.hideSuccessEditAlert= function(){
        $scope.showSuccessEdit= false;
     }

     $scope.hideErrorDeleteAlert= function(){
        $scope.showErrorDelete= false;
     }
     $scope.hideErrorAddAlert= function(){
        $scope.showErrorAdd= false;
     }
     $scope.hideErrorEditAlert= function(){
        $scope.showErrorEdit= false;
     }

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
     };

    $scope.addNewVendor=function(){

    vendorCatService.addVendor($scope.name).then(function(response){
        if(response.success){
        pristineFields();
        $('#NewVendor').modal('hide');
        getResultsPage();
        $scope.showSuccessAdd= true;
        }else{
         $('#NewVendor').modal('hide');
         $scope.showErrorAdd= true;
        }
    });
    }
    $scope.checkVendor= function(value){
        $scope.activeModifyButton= false;
        $scope.idVendor= value;
    };
     $scope.clearFields= function(){
            pristineFields();
        }
    $scope.deleteVendor= function(){
        if($window.confirm('you are gonna delete this, are you sure?')){
            deleteVendorProcess();
        }

    }
    function deleteVendorProcess(){
        vendorCatService.deleteProvider($scope.idVendor).then(function(response){
            if(response.success){
                pristineEditFields();
                $('#EditVendor').modal('hide');
                getResultsPage();
                $scope.showSuccessDelete=true;
            }else{
                $('#EditVendor').modal('hide');
                $scope.showErrorDelete= true;
            }
        });
    }
    $scope.showEditModal= function(){
        var vendorID= $scope.idVendor;
        $("#EditVendor").modal('show');
        returnObjectVendor(vendorID);

    }
    $scope.editVendorProcess= function(){
        var description= $scope.vendorNameEdit;
        var vendorID= $scope.idVendor;
        vendorCatService.updateVendors(vendorID, description).then(function(response){
        if(response.success){
        pristineEditFields();
        $("#EditVendor").modal('hide');
        getResultsPage();
        $scope.showSuccessEdit= true;
        }else{
        $("#EditVendor").modal('hide');
        $scope.showErrorEdit= true;
        }
        })
    }
    function returnObjectVendor(vendorID){
        vendorCatService.getProviderById(vendorID).then(function(response){
            if(response.success){
                $scope.vendorNameEdit = response.data[0].DESCRIPCION;
            }
        });
    }
    function pristineFields(){
            $scope.AddVendor.$setPristine();
            $scope.name= null;
    }
    function pristineEditFields(){
        $scope.EditVendor.$setPristine();
        $scope.vendorNameEdit=null;
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