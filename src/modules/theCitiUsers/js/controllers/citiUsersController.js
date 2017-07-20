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
var citiUsersCtrl = function($mdDialog, $scope, $location,localeService,domainService, employeesCitiService, $cookies, messagesService, jobsCitiService, CitiesService, countryService,$window) {

    if ($cookies.get("citiU") != "true"){
        $location.path("/principal");
    }

    var $this = $scope;
    $this.pageSizeDCU = 10;
    $this.currentPageDCU = 1;
    $this.totalDCU = 0;
    $this.totalUserCiti = 0;
    $this.currentPageCU = 1;
    $this.pageSizeCU = 10;
    $this.totalAppsEmpCiti = 0;
    $this.currentPageAEC = 1;
    $this.pageSizeAEC = 5;
    $this.disableButton = true;
    $this.showButtons = $cookies.get("showButtons") == "true" ? true : false;

    /*
    $this.idDomainCU
    $this.nameDomainCU
    */
    
    /* Local variables */
    var changeTab = function(show, hide){
        $(".citiUsers ul :nth-child("+hide+")").attr("class","");
        $(".citiUsers ul :nth-child("+show+")").attr("class","active")
    };

    var getDetailsEMployee = function(_id,update){
        var petition = false;
        employeesCitiService.getDetailsEMployee(_id).then(function(data){
            petition = data.success;
            if (petition){
                if (update){
                    getCities(data.data[0].idPais);
                    $this.UsoeidEmpC = data.data[0].Soe_Id,
                    $this.UfirstSurnameCU = data.data[0].Apellido_Paterno,
                    $this.UsecondSurnameCU = data.data[0].Apellido_Materno,
                    $this.UfirstNameCU = data.data[0].Primer_Nombre,
                    $this.UsecondNameCU = data.data[0].Segundo_Nombre,
                    $this.UdomainCiti = data.data[0].idDominio,
                    $this.UjobCitiU = data.data[0].idPuesto,
                    $this.UcountryEmpC = data.data[0].idPais,
                    $this.UcitiesEmpC = data.data[0].idCiudad,
                    $this.UextCelEmpC = data.data[0].Ext,
                    $this.UcelEmpC = data.data[0].Movil,
                    $this.UtelOEmpC = data.data[0].Telefono,
                    $this.UemailEmpC = data.data[0].Email,
                    $this.Ureports2EmpC = data.data[0].idReportaA,
                    $this.UcommentEmpC = data.data[0].comentarios
                }else{
                    $this.citiUData = data.data[0];
                }
            }else{
                messagesService.handlerMessages("CITI_USER_DETAILS_ERROR",false);
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

    var getAppsByCitiEmployee = function(newPage){
        var petition = false;
        employeesCitiService.getAppsByCitiEmployee(newPage,$this.pageSizeAEC, $this.idUCiti)
        .then(function(data){
            petition = data.success;
            $this.appsEmp = [];
            if (petition){
                $this.appsEmp = data.data;
            }else{
                messagesService.handlerMessages("CITI_USER_DETAILS_ERROR",false);
            }
        });
    };

    var getAllEmployees = function(){
        var petition = false;
        employeesCitiService.getAllEmployees(1,0)
        .then(function(data){
            petition = data.success;
            if (petition){
                $this.empsCiti = data.data;
            }else{
                messagesService.handlerMessages("CITI_USER_GET_EMPLOYEES_ERROR",false);
            }
        });
    };

    var getJobs  =function(index, rows){
        var petition  = false;
        jobsCitiService.getJobs(index, rows)
        .then(function(data){
            petition = data.success;
            if (petition ){
                $this.jobsCU = data.data;
            }
        });
    };

    var getCities = function(_id){
        var petition = false;
        CitiesService.getCitiesByIdCountry(_id,1,100)
            .then(function(data){
                petition = data.success;
                if (petition){
                    $this.catCities = data.data;
                }
            });
    };

    var getCountries = function(){
        var petition = false;
        countryService.getCountries(1,100).then(function(data){
            petition = data.success;
            if (petition){
                $this.catCountries = data.data;
            }
        });
    };

    var cleanFieldsNewEmp = function(){
        $this.soeidEmpC = null,
        $this.firstSurnameCU = null,
        $this.secondSurnameCU = null,
        $this.firstNameCU = null,
        $this.secondNameCU = null,
        $this.jobCitiU = null,
        $this.citiesEmpC = null,
        $this.extCelEmpC = null,
        $this.celEmpC = null,
        $this.telOEmpC = null,
        $this.emailEmpC = null,
        $this.reports2EmpC = null,
        $this.commentEmpC = null
    };

    var addNewCitiUser = function(){
        var petition = false;
        employeesCitiService.addCitiEmployee(
            $this.soeidEmpC,
            $this.firstSurnameCU,
            $this.secondSurnameCU,
            $this.firstNameCU,
            $this.secondNameCU,
            $this.domainCiti,
            $this.jobCitiU,
            $this.citiesEmpC,
            $this.extCelEmpC,
            $this.celEmpC,
            $this.telOEmpC,
            $this.emailEmpC,
            $this.reports2EmpC,
            $this.commentEmpC
        )
        .then(function(data){
            petition = data.success;
            if (petition){
                $("#NewCitiEmp").modal('hide');
                messagesService.handlerMessages("CITI_USER_ADD_SUCCESSFULLY",true);
                getEmployeesByDomain($this.idDomainCU, $this.currentPageCU, $this.pageSizeCU);
                cleanFieldsNewEmp();
            }else{
                $("#NewCitiEmp").modal('hide');
                messagesService.handlerMessages("CITI_USER_ADD_ERROR",false);
            }
        });
    };

    var deleteCitiUser = function(_id,type){
        var petition = false;
        employeesCitiService.deleteUser(_id)
        .then(function(data){
            petition = data.success;
            if (petition){
                if (type=='details'){
                    changeTab(2,3);
                    $this.showCitiUsersTab("users_per_domain");
                    getEmployeesByDomain($this.idDomainCU, $this.currentPageCU, $this.pageSizeCU);
                }else{
                    getEmployeesByDomain($this.idDomainCU, $this.currentPageCU, $this.pageSizeCU);
                }
                $this.disableButton = true;
                messagesService.handlerMessages("CITI_USER_DELETE_SUCCESSFULLY",true);
            }else{
                messagesService.handlerMessages("CITI_USER_DELETE_ERROR",false);
            }
        });
    };

    var updateCitiUser = function(){
        var petition = false;
        employeesCitiService.updateCitiEmployee(
            $this.UsoeidEmpC,
            $this.UfirstSurnameCU,
            $this.UsecondSurnameCU,
            $this.UfirstNameCU,
            $this.UsecondNameCU,
            $this.UdomainCiti,
            $this.UjobCitiU,
            $this.UcitiesEmpC,
            $this.UextCelEmpC,
            $this.UcelEmpC,
            $this.UtelOEmpC,
            $this.UemailEmpC,
            $this.Ureports2EmpC,
            $this.UcommentEmpC
        )
        .then(function(data){
            petition = data.success;
            if (petition){
                $("#UpdateCitiEmp").modal('hide');
                messagesService.handlerMessages("CITI_USER_UPDATE_SUCCESSFULLY",true);
                getEmployeesByDomain($this.idDomainCU, $this.currentPageCU, $this.pageSizeCU);
                cleanFieldsNewEmp();
            }else{
                $("#UpdateCitiEmp").modal('hide');
                messagesService.handlerMessages("CITI_USER_UPDATE_ERROR",false);
            }
        });
    };

    /* Scope functions */
    $this.updateCitiUsers = function(){
        getAllEmployees();
        getJobs(1,100);
        getCountries();
        getDetailsEMployee($this.idUCiti,'update');
    };

    $this.updateEmpCiti = function(){
        updateCitiUser();
    };

    $scope.deleteCitiUsers = function(ev,type) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.confirm()
            .title('You are gonna delete this Citi Employee, Are you sure?')
            .ariaLabel('Delete Employee Citi')
            .targetEvent(ev)
            .ok('Yes')
            .cancel('Cancel');
        if ($cookies.get("i") == "es-MX"){
            confirm = $mdDialog.confirm()
            .title('Vas a borrar este Empleado Citi, ¿Estás seguro?')
            .ariaLabel('Delete Employee Citi')
            .targetEvent(ev)
            .ok('Si')
            .cancel('Cancelar');
        }

        $mdDialog.show(confirm).then(function() {
            deleteCitiUser($this.idUCiti,type);
        }, function() {
        
        });
    };
    /*$this.deleteCitiUsers = function(type){
        if($window.confirm('You are gonna delete this user, are you sure?')){
            deleteCitiUser($this.idUCiti,type);
        }
    };*/

    $this.empCSelected = function(idEmpC){
        $this.idUCiti = idEmpC;
        $this.disableButton = false;
    };

    $this.addNewEmpCiti = function(){
        addNewCitiUser();
    };

    $this.prepareCombosEmpCiti = function(){
        $this.domainCiti = $this.idDomainCU;
        getDomains(1,100);
        getJobs(1,100);
        getCountries();
        getAllEmployees();
    };

    $this.getCities = function(_id){
        getCities(_id);
    };

    $this.pageChangeHandlerAppsEmpCiti = function(newPage){
        getAppsByCitiEmployee(newPage);
    };
    $this.showCitiUserDetails = function(_id){
        getDetailsEMployee(_id);
        $this.idUCiti = _id;
        getAppsByCitiEmployee($this.currentPageAEC);
        changeTab(3, 2);
        $this.showCitiUsersTab('specific_detail');
    };

    $this.showCitiUsersIdDomain = function(_id,_desc){
        $this.idDomainCU = _id;
        $this.nameDomainCU = _desc;
        $this.disableButton = true;
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