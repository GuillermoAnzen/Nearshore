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
var applicationCtrl = function($scope, $rootScope ,domainService,vendorCatService,applicationService,messagesService,employeesCitiService,employeesVendorService) {

    var $this = $scope;
    $this.currentPage = 1;
    $this.pageSize = 10;
    $this.currentPageD = 1;
    $this.pageSizeD = 10;
    $this.level = 1;
    $this.totalApps = 0;
    $this.totalDomains = 0;
    $this.domainSelected = 0;
    $this.idDomainSelected = 0;

    var clearFieldsAddNewApp = function(){
        $this.domain_app = null;
        $this.csiId_app = null;
        $this.ptbId = null;
        $this.sDesc = null;
        $this.lDesc = null;
        $this.supportL1 = null;
        $this.supportL2 = null;
        $this.supportL3 = null;
        $this.ptfPrimary = null;
        $this.ptfSecondary = null;
        $this.ptfTertiary = null;
        $this.commentsApp = null;
    };

    var getDomains = function(newPage,pageSize){
        var petitionSuccess = false;
        domainService.getDomain(newPage,pageSize).then(function(data){
            petitionSuccess = data.success;
            if (petitionSuccess){
                $scope.domains = data.data;
                $this.totalDomains = data.data[0].total;
            }
        });
    };

    $this.pageChangeHandlerDomain = function(newPage){
        getDomains(newPage,$this.pageSizeD);
    };

    $this.pageChangeHandler = function(newPage){
        getApplicationDomain(newPage,$this.idDomainSelected);
    }
    var getApplicationDomain = function(currentPage,_idDomain){
        var petitionSuccess = false;
        domainService.getApplicationDomain(currentPage,$this.pageSize,_idDomain).then(function(data){
            petitionSuccess = data.success;
            if (petitionSuccess){
                $scope.aplicationD = data.data;
                $this.totalApps = data.data[0].total;
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
        $scope.app = [];
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

    var getDetailsL = function(_idapp,_level,_idProv){
        var petitionSuccess = false;
        var message = "";
        applicationService.getDetailsL(_idapp,_level).then(function(data){
            petitionSuccess = data.success;
            if (petitionSuccess){
                if (data.data.length != 0){
                    $scope.detailsL = data.data;
                    getAnalistas();
                    getGerentes();
                    getLideres();
                    getEmployeesVendor(_idProv);
                }else{
                    $scope.detailsL = [];
                    message = "No se han encontrado datos, por favor actualicelos.";
                }
            }
        });
    };

    var getAnalistas = function(id_analista_bnmx){
        var petitionSuccess = false;
        var valDefault = "";
        employeesCitiService.getAnalistas().then(function(data){
            petitionSuccess = data.success;
            if (petitionSuccess){
                $scope.analistList = data.data;
            }
        });
    };

    var getLideres = function(_id){
        var petitionSuccess = false;
        var valDefault = "";
        employeesCitiService.getLideres().then(function(data){
            petitionSuccess = data.success;
            $scope.leadList = [];
            if (petitionSuccess){
                $scope.leadList = data.data;
            }
        });
    };

    var getGerentes = function(_id){
        var petitionSuccess = false;
        var valDefault = "";
        employeesCitiService.getGerentes().then(function(data){
            petitionSuccess = data.success;
            if (petitionSuccess){
                $scope.managerList = [];
                if (data.data.length != 0){
                    $scope.managerList = data.data;
                    /*for (var i=1;i<=data.data.length;i++){
                        if (data.data[i-1].id == _id){
                            valDefault  = data.data[i-1].gerente;
                        }
                        $("#manager_bnmx").editableSelect('add',data.data[i-1].gerente,i-1,{"value":{name:"value",value:data.data[i-1].id}});
                    }
                    $("#manager_bnmx").val(valDefault);*/
                }
            }
        });
    };

    var getEmployeesVendor = function(_idProv){
        var petitionSuccess = false;
        employeesVendorService.getEmployeesPerVendor(_idProv).then(function(data){
            petitionSuccess = data.success;
            if (petitionSuccess){
                $scope.EmpProvList = [];
                if (data.data.length != 0){
                    $scope.EmpProvList = data.data;
                }else{
                    messagesService.handlerMessages("NO_EMPLOYEES_CONS_APP",false);
                }
            }
        });
    };

    /*var clearSelectCombos = function(){
        $("#resp_prov").editableSelect('clear');
        $("#back_prov").editableSelect('clear');
        $("#lider_prov").editableSelect('clear');
        $("#p_man_prov").editableSelect('clear');
        $("#d_man_prov").editableSelect('clear');
        $("#analist_bnmx").editableSelect('clear');
        $("#manager_bnmx").editableSelect('clear');
        $("#lead_bnmx").editableSelect('clear');
        
        $("#resp_prov").val('');
        $("#back_prov").val('');
        $("#lider_prov").val('');
        $("#p_man_prov").val('');
        $("#d_man_prov").val('');
        $("#analist_bnmx").val('');
        $("#manager_bnmx").val('');
        $("#lead_bnmx").val('');
    };*/

    $this.prepareCombos = function(){
        getDomains(1,100);
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
            $("#UpdateApp").modal('hide');
        }
    };

    $this.updateDetailsL = function(flag){
        if (flag == "true"){
            $scope.my.updateDetL = true;
        }else{
            $scope.my.updateDetL = false;
        }
    };

    $this.showApplicationsIdDomain = function(_id,_domain){
        $(".applications ul :nth-child(1)").attr("class","");
        $(".applications ul :nth-child(2)").attr("class","active")
        $this.showApplicationTab( "applications_domain",true);
        $scope.domainSelected = _domain;
        $scope.idDomainSelected = _id;
        getApplicationDomain($this.currentPage ,_id);
    }

    $this.showApplicationsDetails = function(_csiId){
        $(".applications ul :nth-child(2)").attr("class","");
        $(".applications ul :nth-child(3)").attr("class","active")
        $this.showApplicationTab( "details_application",true);
        $scope.idAppDel = _csiId;
        getApplicationDetails(_csiId);
    };

    $this.showDetailsL = function(_idApp,_level,_idProv){
        $(".applications ul :nth-child(3)").attr("class","");
        $(".applications ul :nth-child(4)").attr("class","active")
        $this.showApplicationTab( "application_consult",true);
        $rootScope.levelUpdate = 'UPDATEL'+ _level +'_APP';
        $this.level = _level;
        $this.idProv = _idProv;
        $scope.detailsL = [];
        getDetailsL(_idApp,_level,_idProv);
    };

    $this.addNewApp = function(){
        var petitionSuccess = false;
        var idAppLocal = $this.csiId_app;
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
                clearFieldsAddNewApp();
                messagesService.handlerMessages("SUCCESS_REGISTRY",true);
                $this.showApplicationsDetails(idAppLocal);
            }else{
                messagesService.handlerMessages("ERROR_OCURRED",false);
            }
            $("#NewApp").modal('hide');
        });
    };

    $this.saveChangesApplication = function(){
        var petitionSuccess = false;
        applicationService.updateApplication(
            $("#csiId_appUp").val(),
            $("#domain_appUp").val(),
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

    $this.deleteApplication = function(_id){
        var petitionSuccess = false;
        applicationService.deleteApplication(
            _id
        ).then(function(data){
            petitionSuccess = data.success;
            if (petitionSuccess){
                messagesService.handlerMessages("DELETED_SUCCESS_APP",true);
                $this.showApplicationsIdDomain($scope.idDomainSelected,$scope.domainSelected);
            }else
                messagesService.handlerMessages("ERROR_DELETE_APP",false);
        });
    };

    $this.saveChangesSupportApplication = function(){
        var petitionSuccess = false;
        var id = $("#csiId_appUp").val();
        var resp_prov = $("#resp_prov").val();// ~ ul>li.es-visible").attr("value");
        var back_prov = $("#back_prov").val();// ~ ul>li.es-visible").attr("value");
        var lider_prov = $("#lider_prov").val();// ~ ul>li.es-visible").attr("value"); 
        var p_man_prov = $("#p_man_prov").val();// ~ ul>li.es-visible").attr("value");
        var d_man_prov = $("#d_man_prov").val();// ~ ul>li.es-visible").attr("value");
        var man_bnmx = $("#manager_bnmx").val();// ~ ul>li.es-visible").attr("value");
        var lead_bnmx = $("#lead_bnmx").val();// ~ ul>li.es-visible").attr("value");
        var analista_bnmx = $("#analist_bnmx").val();// ~ ul>li.es-visible").attr("value");
        var level  = $this.level;
        applicationService.updateSupportL(
            id, 
            resp_prov, 
            back_prov, 
            lider_prov, 
            p_man_prov, 
            d_man_prov, 
            man_bnmx, 
            lead_bnmx, 
            analista_bnmx, 
            level
        ).then(function(data){
            petitionSuccess = data.success;
            if (petitionSuccess){
                messagesService.handlerMessages("APPLICATION_UPDATE_SUPPORT_SUCCESS",true);
                $this.showDetailsL(id,level,$this.idProv);
                $this.updateDetailsL('false');
                $("#UpdateSupport").modal('hide');
            }else{
                messagesService.handlerMessages("APPLICATION_UPDATE_SUPPORT_ERROR",false);
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
                getDomains($this.currentPageD,$this.pageSizeD);
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