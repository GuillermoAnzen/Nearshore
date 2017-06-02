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
var applicationCtrl = function($scope,domainService,vendorCatService,applicationService,messagesService) {

    var $this = $scope;

    $this.currentPage = 1;
    $this.pageSize = 10;
    $scope.my  = {update : false};

    var getDomains = function(){
        var petitionSuccess = false;
        var domains;
        domainService.getDomain($this.currentPage,$this.pageSize).then(function(data){
            petitionSuccess = data.success;
            if (petitionSuccess){
                $scope.domains = data.data;
            }
        });
    };

    var getApplicationDomain = function(_idDomain){
        var petitionSuccess = false;
        domainService.getApplicationDomain($this.currentPage,$this.pageSize,_idDomain).then(function(data){
            petitionSuccess = data.success;
            if (petitionSuccess){
                $scope.aplicationD = data.data;
            }
        });
    }

    var getApplicationDomainAll = function(){
        var petitionSuccess = false;
        domainService.getAllApplicationDomain().then(function(data){
            petitionSuccess = data.success;
            if (petitionSuccess){
                $scope.aplicationD = data.data;
            }
        });
    }

    var getApplicationDetails = function(_csiId){
        var petitionSuccess = false;
        applicationService.getApplicationDetails(_csiId).then(function(data){
            petitionSuccess = data.success;
            if (petitionSuccess){
                $scope.app = data.data;
            }
        });
    }

    var getVendors = function(){
        var petitionSuccess = false;
        vendorCatService.getVendors().then(function(data){
            petitionSuccess = data.success;
            if (petitionSuccess){
                $scope.vendors = data.data;
            }
        });
    };

    var getPlatforms = function(){
        var petitionSuccess = false;
        vendorCatService.getPlatforms().then(function(data){
            petitionSuccess = data.success;
            if (petitionSuccess){
                $scope.platforms = data.data;
            }
        });
    };

    $this.prepareCombos = function(){
        getDomains();
        getVendors();
        getPlatforms();
    };

    $this.updateApplication = function(flag){
        if (flag == "true"){
            $scope.my.update = true;
            getVendors();
            getPlatforms();
        }else
            $scope.my.update = false;
    };

    $this.showApplicationsIdDomain = function(_id){
        $(".applications ul :nth-child(1)").attr("class","");
        $(".applications ul :nth-child(2)").attr("class","active")
        $this.showApplicationTab( "applications_domain",true);
        getApplicationDomain(_id);
    }

    $this.showApplicationsDetails = function(_csiId){
        $(".applications ul :nth-child(2)").attr("class","");
        $(".applications ul :nth-child(3)").attr("class","active")
        $this.showApplicationTab( "details_application",true);
        getApplicationDetails(_csiId);
    };

    $this.addNewApp = function(){
        var petitionSuccess = false;
        applicationService.addAplication(
            $this.csiId_app,
            $this.domain_app,
            $this.ptbId,
            $this.sDesc,
            $this.lDesc,
            $this.supportL1,
            $this.supportL2,
            $this.supportL3,
            $this.ptfPrimary,
            $this.ptfSecondary,
            $this.ptfTertiary,
            $this.commentsApp
        ).then(function(data){
            petitionSuccess = data.success;
            
            if (petitionSuccess){
                $scope.message = true;
                $("#NewApp").modal('hide');
                messagesService.handlerMessages("Registro Exitoso","alert alert-success alert-dismissable");
            }else{
                $("#NewApp").modal('hide');
                messagesService.handlerMessages("Ocurrió un error","alert alert-danger alert-dismissable");
            }
        });
    };

    $this.showApplicationTab = function(tabName,flag){
        // Declare all variables
        var i, tabcontent, tablinks;

        // Get all elements with class="tabcontent" and hide them
        tabcontent = $(".tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }

        // Get all elements with class="tablinks" and remove the class "active"
        tablinks = $(".tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        
        if (!flag){
            if (tabName == "domains"){
                getDomains();
            }else if(tabName == "applications_domain"){
                getApplicationDomainAll();
            }else if(tabName == "details_application"){
                getApplicationDetails();
            }
        }

        // Show the current tab, and add an "active" class to the button that opened the tab
        document.getElementById(tabName).style.display = "block";
    };

    //$(".applications .nav-tabs .active a").click();
    window.onload = $this.showApplicationTab("domains");
};

module.exports = angular.module("app.applications").controller('applicationCtrl', applicationCtrl);