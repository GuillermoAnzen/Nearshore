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
var citiUsersCtrl = function($scope, $location,localeService,domainService, employeesCitiService) {

    var $this = $scope;
    $this.pageSizeDCU = 10;
    $this.currentPageDCU = 1;
    $this.totalDCU = 0;
    $this.totalUserCiti = 0;
    $this.currentPageCU = 1;
    $this.pageSizeCU = 10;

    /*
    $this.idDomainCU
    $this.nameDomainCU
    */
    
    /* Local variables */
    var changeTab = function(show, hide){
        $(".citiUsers ul :nth-child("+hide+")").attr("class","");
        $(".citiUsers ul :nth-child("+show+")").attr("class","active")
    };

    var getDetailsEMployee = function(_id){
        var petition = false;
        employeesCitiService.getDetailsEMployee(_id).then(function(data){
            petition = data.success;
            if (petition){

            }
        });
    };

    var getEmployeesByDomain = function(_idDomain, _index, _rows){
        var petition = false;
        employeesCitiService.getEmployeesByDomain(_idDomain, _index, _rows).then(function(data){
            petition = data.success;
            if (petition){
                $this.citiUsersList = data.data;
                if (data.data.length != 0)
                    $this.totalUserCiti = data.data[0].total;
            }
        });
    };

    var getDomains = function(newPage,pageSize){
        var petitionSuccess = false;
        domainService.getDomain(newPage,pageSize).then(function(data){
            petitionSuccess = data.success;
            if (petitionSuccess){
                $this.domainsCU = data.data;
                if (data.data.length != 0){
                    $this.totalDCU = data.data[0].total;
                }
            }
        });
    };

    /* Scope functions */
    $this.showCitiUserDetails = function(_id){
        getDetailsEMployee(_id);
    };

    $this.showCitiUsersIdDomain = function(_id,_desc){
        $this.idDomainCU = _id;
        $this.nameDomainCU = _desc;
        getEmployeesByDomain($this.idDomainCU, $this.currentPageCU, $this.pageSizeCU);
        changeTab(2, 1);
        $this.showCitiUsersTab('users_per_domain');
    };

    $this.pageChangeHandlerDCU = function(newPage){
        getDomains(newPage, $this.currentPageDCU);
    };

    $this.pageChangeHandlerCitiUsers = function(newPage){
        getEmployeesByDomain($this.idDomainCU, newPage, $this.pageSizeCU);
    };
    
    $this.showCitiUsersTab = function(tabName){
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

        // Show the current tab, and add an "active" class to the button that opened the tab
        document.getElementById(tabName).style.display = "block";

        if ("domains"){
            getDomains($this.currentPageDCU, $this.pageSizeCU);
        }
    };

    /*Default function tab */
    defaultTabFunction("domains");

    function defaultTabFunction(_tab){
        $this.showCitiUsersTab(_tab);
    };
};

module.exports = angular.module("app.citiUsers").controller('citiUsersCtrl', citiUsersCtrl);