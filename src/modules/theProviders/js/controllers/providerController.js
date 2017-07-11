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
var providerCtrl = function($scope, $location,localeService,vendorCatService,employeesVendorService,jobsVendorService,CitiesService,countryService,messagesService, $cookies,$window) {

    if ($cookies.get("provs") != "true"){
        $location.path("/principal");
    }

    var $this = $scope;
    $this.totalProviders = 0;
    $this.currentPageP = 1;
    $this.pageSizeP = 10;
    $this.currentPageEP = 1;
    $this.pageSizeEP = 10;
    $this.currentPageAEP = 1;
    $this.pageSizeAEP = 5;
    $this.totalAppsEmpProvider = 0;
    $this.activeModifyButton = true;
    $this.newEmpProv = true;

    $this.showButtons = $cookies.get("showButtons") == "true" ? true : false;
    $this.emp =  $cookies.get("emp") == "true" ? true : false;
    /*  $this.idEmp
        $this.desciption
        $this.idProv
        $this.catCities
        $this.catJobs
        $this.catCountries
        $this.modeUpdate
     */

    $this.updateEmpVendor = function(){
        var petition = false;
        employeesVendorService.updateEmployee(
            $this.idEmpProv,
            $this.UPvendorEmpP,
            $this.UPjobsEmpP,
            $this.UPcodeEmpP,
            $this.UPnameEmpP,
            $this.UPSNameEmpP,
            $this.UPPLnameEmpP,
            $this.UPSSnameEmpP,
            $this.UPcitiesEmpP,
            $this.UPldCelEmpP,
            $this.UPcelEmpP,
            $this.UPldTelOEmpP,
            $this.UPtelOEmpP,
            $this.UPldOfficeEmpP,
            $this.UPtelOfficeEmpP,
            $this.UPextOfficeEmpP,
            $this.UPemailEmpP,
            $this.UPsoeidEmpP,
            $this.UPemailCitiEmpP,
            $this.UPtelCitiEmpP,
            $this.UPextCitiEmpP,
            $this.UPreports2EmpP,
            $this.UPcommentEmpP
        )
        .then(function(data){
            petition = data.success;
            if (petition){
                messagesService.handlerMessages("UPDATE_EMP_PROV_SUCCESS",true);
                $("#UpdateEmpProv").modal('hide');
                if ($this.modeUpdate == "all"){
                    showDetailsProvider($this.currentPageEP,$this.pageSizeEP, $this.idProv);
                }else{
                    getEmpProvId($this.idEmpProv);
                    getAppsByEmp($this.idEmpProv, $this.currentPageAEP, $this.pageSizeAEP);
                }
            }else{
                $("#UpdateEmpProv").modal('hide');
                messagesService.handlerMessages("UPDATE_EMP_PROV_ERROR",false);
            }
        });
    };

    $this.updateEmpProv = function(mode){
        $this.modeUpdate = mode;
        getVendors();
        getCountries();
        getCities();
        getJobs();
        getEmployeesVendor($this.idProv);
        getEmpProvId($this.idEmpProv);
    };

    $this.getEmpsVendor = function(){
        getEmployeesVendor($this.vendorEmpP);
    };

    $this.getCities = function(_id){
        getCities(_id);
    };

    $this.prepareCombosEmpProv = function(){
        getJobs();
        getCountries();
        getVendors();
        getEmployeesVendor($this.idProv);
        $this.vendorEmpP = $this.idProv;
    };

    $this.addNewEmpProv = function(){
        var petition = false;
        employeesVendorService.addEmployee(
            $this.vendorEmpP,
            $this.jobsEmpP,
            $this.codeEmpP,
            $this.nameEmpP,
            $this.SNameEmpP,
            $this.PLnameEmpP,
            $this.SSnameEmpP,
            $this.citiesEmpP,
            $this.ldCelEmpP,
            $this.celEmpP,
            $this.ldTelOEmpP,
            $this.telOEmpP,
            $this.ldOfficeEmpP,
            $this.telOfficeEmpP,
            $this.extOfficeEmpP,
            $this.emailEmpP,
            $this.soeidEmpP,
            $this.emailCitiEmpP,
            $this.telCitiEmpP,
            $this.extCitiEmpP,
            $this.reports2EmpP,
            $this.commentEmpP
        )
        .then(function(data){
            petition = data.success;
            if (petition){
                $("#NewEmpProv").modal('hide');
                messagesService.handlerMessages("ADD_EMP_PROV_SUCCESS",true);
                showDetailsProvider($this.currentPageEP,$this.pageSizeEP, $this.idProv);
                cleanFieldsNewEmp();
            }else{
                $("#NewEmpProv").modal('hide');
                messagesService.handlerMessages("ADD_EMP_PROV_ERROR",false);
            }
        });
    };

    $this.pageChangeHandlerAppsEmpProviders = function(newPage){
        getAppsByEmp($this.idEmpProv, newPage, $this.pageSizeAEP);
    };

    $this.empSelected = function(_idEmp){
        $this.activeModifyButton = false;
        $this.idEmpProv = _idEmp;
    };

    $this.deleteEmpProvider = function(){
        if($window.confirm('you are gonna delete this user, are you sure?')){
            deleteEmpProvider($this.idEmpProv);
        }
    };

    $this.showSpecificDetailsEmp = function(_id){
        $this.activeModifyButton = true;
        $this.idEmpProv = _id;
        $this.showProviderTab('provider_specific_detail');
        showNHide(3,2);
        getEmpProvId(_id);
        getAppsByEmp($this.idEmpProv, $this.currentPageAEP, $this.pageSizeAEP);
    };

    $this.showDetailsProviderId = function(_id, _desc){
        $this.desciption = _desc;
        $this.idProv = _id;
        $this.showProviderTab('provider_details',true);
        showDetailsProvider($this.currentPageEP,$this.pageSizeEP, $this.idProv);
    };

    $this.pageChangeHandlerProviders = function(newPage){
        showProviders(newPage,$this.pageSizeP);
    };
    
    $this.showProviderTab = function(tabName,flag){
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
            tablinks[i].className = tablinks[i].className.replace("active", "");
        }

        if (tabName == "provider_consult"){
            showProviders($this.currentPageP, $this.pageSizeP);
        }else if (tabName == "provider_details" && flag){
            showNHide(2,1);
        }

        // Show the current tab, and add an "active" class to the button that opened the tab
        document.getElementById(tabName).style.display = "block";
    };

    $this.pageChangeHandlerEmpProviders = function(newPage){
        showDetailsProvider(newPage, $this.pageSizeEP, $this.idProv);
    };

    /* local functions */
    var showProviders = function (_index, _rows){
        var petition = false;
        vendorCatService.getProviders(_index, _rows)
        .then(function(data){
            petition = data.success;
            if (petition){
                $this.providerList = data.data;
                $this.totalProviders = data.data[0].total;
            }
        });
    };

    var showDetailsProvider = function(_index,_rows,_id){
        var petition = false;
        vendorCatService.getDetailsProvider(_index, _rows, _id)
        .then(function(data){
            petition = data.success;
            if (petition){
                if (data.data.length != 0){
                    $this.empsProv = data.data;
                    $this.totalEmpProvider = data.data[_rows-(_rows-1)].total;
                }else{
                    $this.totalEmpProvider = 0;
                    $this.empsProv = [];
                }
            }
        });
    }

    var showNHide = function(show, hide){
        $(".provider ul :nth-child("+hide+")").attr("class","");
        $(".provider ul :nth-child("+show+")").attr("class","active")
    }

    var getEmpProvId = function(_id){
        var petition = false;
        employeesVendorService.getDetailsEmp(_id)
        .then(function(data){
            petition = data.success;
            if (petition){
                $this.empDet = data.data[0];
                $this.UPvendorEmpP = data.data[0].Id_Proveedor;
                $this.UPjobsEmpP = data.data[0].idPuesto;
                $this.UPcodeEmpP = data.data[0].Clave_Empleado;
                $this.UPnameEmpP = data.data[0].Primer_Nombre;
                $this.UPPLnameEmpP = data.data[0].Apellido_Paterno;
                $this.UPSSnameEmpP = data.data[0].Apellido_Materno;
                $this.UPcountryEmpP = data.data[0].idPais;
                $this.UPcitiesEmpP = data.data[0].idCiudad;
                $this.UPreports2EmpP = data.data[0].idReporta;
            }
        });
    }

    var getAppsByEmp = function(_id, _index, _rows){
        var petition = false;
        employeesVendorService.getAppsByEmployee(_id, _index, _rows)
        .then(function(data){
            petition = data.success;
            if (petition && data.data.length != 0){
                $this.appsEmp = data.data;
                $this.totalAppsEmpProvider = data.data[0].total;
            }
        });
    }

    var getJobs = function(){
        var petition = false;
        jobsVendorService.getJobs().then(function(data){
            petition = data.success;
            if (petition){
                $this.catJobs = data.data;
            }
        });
    };

    var getCities = function(_id){
        var petition = false;
        if (_id){
            CitiesService.getCitiesId(_id,1,100)
            .then(function(data){
                petition = data.success;
                if (petition){
                    $this.catCities = data.data;
                }
            });
        }else{
            CitiesService.getCities()
            .then(function(data){
                petition = data.success;
                if (petition){
                    $this.catCities = data.data;
                }
            });
        }
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

    var getEmployeesVendor = function(_id){
        var petitionSuccess = false;
        employeesVendorService.getEmployeesPerVendor(_id).then(function(data){
            petitionSuccess = data.success;
            if (petitionSuccess){
                $this.empsVendor = [];
                if (data.data.length != 0){
                    $this.empsVendor = data.data;
                }else{
                    messagesService.handlerMessages("NO_EMPLOYEES_CONS_APP",false);
                }
            }
        });
    };

    var getVendors = function(){
        var petitionSuccess = false;
        vendorCatService.getVendors().then(function(data){
            petitionSuccess = data.success;
            if (petitionSuccess){
                $this.vendors = data.data;
            }
        });
    };

    var deleteEmpProvider = function(_id){
        var petition = false;
        employeesVendorService.deleteEmployee(_id)
        .then(function(data){
            petition = data.success;
            if (petition){
                showDetailsProvider($this.currentPageEP,$this.pageSizeEP, $this.idProv);
                $this.activeModifyButton = true;
                messagesService.handlerMessages("EMPLOYEE_DELETE_SUCCESS",true);
            }else
                messagesService.handlerMessages("EMPLOYEE_DELETE_ERROR",false);
        });
    };

    var cleanFieldsNewEmp = function(){
        $this.vendorEmpP = null;
        $this.jobsEmpP  = null;
        $this.codeEmpP = null;
        $this.nameEmpP = null;
        $this.SNameEmpP = null;
        $this.PLnameEmpP = null;
        $this.SSnameEmpP = null;
        $this.citiesEmpP = null;
        $this.ldCelEmpP = null;
        $this.celEmpP = null;
        $this.ldTelOEmpP = null;
        $this.telOEmpP = null;
        $this.ldOfficeEmpP = null;
        $this.telOfficeEmpP = null;
        $this.extOfficeEmpP = null;
        $this.emailEmpP = null;
        $this.soeidEmpP = null;
        $this.emailCitiEmpP = null;
        $this.telCitiEmpP = null;
        $this.extCitiEmpP = null;
        $this.reports2EmpP = null;
        $this.commentEmpP = null;
    };

    /* default function */
    getDefaultTab("provider_consult");

    function getDefaultTab (_tab){
        $this.showProviderTab(_tab);

    }
};

module.exports = angular.module("app.providers").controller('providerCtrl', providerCtrl);