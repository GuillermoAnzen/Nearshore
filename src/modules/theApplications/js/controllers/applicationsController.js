'use strict';
var angular = require('angular');
var select = require('jquery-editable-select');
/**
 * @ngdoc controller
 * @name app.login.controller:loginCtrl
 * @description 
 * Controller for the handle to authentication page
 * @param {undefinided} this This function does not get parameters yet.
 * @returns {undefinided} This function does not return values.
 */
var applicationCtrl = function($scope, $rootScope ,domainService,vendorCatService,applicationService,messagesService,employeesCitiService,employeesVendorService) {

    var $this = $scope;
    $this.currentPage = 1;
    $this.pageSize = 10;
    $this.my  = {  update : false,
                    updateDetL: false};
    $this.level = 1;

    var test = function(data){
        var array = {"value":{name:"value",value:12}};//{"name":"value",value:12};
        $.each(array,function(i, attr){
            var prueba = attr.name;
            var otro = attr.value;
            $("h1").attr(attr.name, attr.value);
            $("h1").data(data);
        });
    };

    test();

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

    var getDetailsL = function(_idapp,_level){
        var petitionSuccess = false;
        var message = "";
        applicationService.getDetailsL(_idapp,_level).then(function(data){
            petitionSuccess = data.success;
            if (petitionSuccess){
                if (data.data.length != 0){
                    $scope.detailsL = data.data;
                }else{
                    $scope.detailsL = [];
                    message = "No se han encontrado datos, por favor actualicelos.";
                }
            }
        });
    };

    var getAnalistas = function(){
        var petitionSuccess = false;
        $("#analist_bnmx").editableSelect('clear');
        employeesCitiService.getAnalistas().then(function(data){
            petitionSuccess = data.success;
            if (petitionSuccess){
                $scope.analistList = data.data;
                for (var i=1;i<=data.data.length;i++){
                    $("#analist_bnmx").editableSelect('add',data.data[i-1].analista,i-1,{"value":{name:"value",value:data.data[i-1].id}});
                }
            }else{
                //$scope.analistList = [];
                messagesService.handlerMessages("NO ANALISTS",false);
            }
        });
    };

    var getLideres = function(){
        var petitionSuccess = false;
        $("#lead_bnmx").editableSelect('clear');
        employeesCitiService.getLideres().then(function(data){
            petitionSuccess = data.success;
            $scope.leadList = [];
            if (petitionSuccess){
                $scope.leadList = data.data;
                for (var i=1;i<=data.data.length;i++){
                    $("#lead_bnmx").editableSelect('add',data.data[i-1].lider,i-1,{"value":{name:"value",value:data.data[i-1].id}});
                }
            }else{
                //$scope.leadList = [];
                messagesService.handlerMessages("NO LEADER",false);
            }
        });
    };

    var getGerentes = function(){
        var petitionSuccess = false;
        $("#manager_bnmx").editableSelect('clear');
        employeesCitiService.getGerentes().then(function(data){
            petitionSuccess = data.success;
            if (petitionSuccess){
                $scope.managerList = data.data;
                for (var i=1;i<=data.data.length;i++){
                    $("#manager_bnmx").editableSelect('add',data.data[i-1].gerente,i-1,{"value":{name:"value",value:data.data[i-1].id}});
                }
            }else{
                //$scope.managerList = [];
                messagesService.handlerMessages("NO MANAGERS",false);
            }
        });
    };

    var getEmployeesVendor = function(_idProv){
        var petitionSuccess = false;
        $("#resp_prov").editableSelect('clear');
        $("#back_prov").editableSelect('clear');
        $("#lider_prov").editableSelect('clear');
        $("#p_man_prov").editableSelect('clear');
        $("#d_man_prov").editableSelect('clear');
        employeesVendorService.getEmployeesPerVendor(_idProv).then(function(data){
            petitionSuccess = data.success;
            if (petitionSuccess){
                $scope.EmpProvList = data.data;
                for (var i=1;i<=data.data.length;i++){
                    if (i==10)
                        $("#resp_prov").editableSelect('add',data.data[i-1].nombre,i-1,{"value":{name:"value",value:data.data[i-1].id}}).val(data.data[i-1].nombre);
                    else
                        $("#resp_prov").editableSelect('add',data.data[i-1].nombre,i-1,{"value":{name:"value",value:data.data[i-1].id}});
                    $("#back_prov").editableSelect('add',data.data[i-1].nombre,i-1,{"value":{name:"value",value:data.data[i-1].id}});
                    $("#lider_prov").editableSelect('add',data.data[i-1].nombre,i-1,{"value":{name:"value",value:data.data[i-1].id}});
                    $("#p_man_prov").editableSelect('add',data.data[i-1].nombre,i-1,{"value":{name:"value",value:data.data[i-1].id}});
                    $("#d_man_prov").editableSelect('add',data.data[i-1].nombre,i-1,{"value":{name:"value",value:data.data[i-1].id}});
                }
            }else{
                //$scope.EmpProvList = [];
                messagesService.handlerMessages("NO EMPLOYEES",false);
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
        }else{
            $scope.my.update = false;
        }
    };

    $this.updateDetailsL = function(flag){
        if (flag == "true"){
            $scope.my.updateDetL = true;
        }else{
            $scope.my.updateDetL = false;
        }
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

    $this.showDetailsL = function(_idApp,_level,_idProv){
        $(".applications ul :nth-child(3)").attr("class","");
        $(".applications ul :nth-child(4)").attr("class","active")
        $this.showApplicationTab( "application_consult",true);
        $rootScope.levelUpdate = 'UPDATEL'+ _level +'_APP';
        $this.level = _level;
        getAnalistas();
        getGerentes();
        getLideres();
        getEmployeesVendor(_idProv);
        getDetailsL(_idApp,_level);
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
                messagesService.handlerMessages("SUCCESS_REGISTRY",true);
            }else{
                messagesService.handlerMessages("ERROR_OCURRED",false);
            }
            $("#NewApp").modal('hide');
        });
    };

    $this.saveChangesApplication = function(){
        var petitionSuccess = false;
        applicationService.updateApplication(
            $("#domain_appUp").val(),
            $("#csiId_appUp").val(),
            $("#ptbIdUp").val(),
            $("#sDescUp").val(),
            $("#lDescUp").val(),
            $("#supportL1Up").val(),
            $("#supportL2Up").val(),
            $("#supportL3Up").val(),
            $("#ptfPrimaryUp").val(),
            $("#ptfSecondaryUp").val(),
            $("#ptfTertiaryUp").val(),
            $("#commentsAppUp").val()
        ).then(function(data){
            petitionSuccess = data.success;
            if (petitionSuccess){
                messagesService.handlerMessages("SUCCESS_UPDATE",true);
                $this.showApplicationsDetails($("#csiId_appUp").val());
                $this.updateApplication(false);
            }else{
                messagesService.handlerMessages("ERROR_OCURRED",false);
            }
        });
    };

    $this.saveChangesSupportApplication = function(idApp){
        var id = idApp;
        var idApp = $scope.detailsL[0].idApp;
        var level  = $this.level;
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

    getDefaultTab("domains");

    function getDefaultTab (_tab){
        $this.showApplicationTab(_tab);

    }
};

module.exports = angular.module("app.applications").controller('applicationCtrl', applicationCtrl);