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
var catalogCtrl = function($scope, $location,localeService, $cookies, vendorCatService, $window, plataformServices, jobsCitiService, domainServices, countryService, CitiesService) {

     $scope.currentPage = 1;
     $scope.currentPageDomains=1;
     $scope.currentPageCountry=1;
     $scope.currentPageCity=1;
     $scope.pageSize = 10;
     $scope.pageSizeplataform=10;
     $scope.pageSizeProfile= 10;
     $scope.pageSizeDomain=10;
     $scope.pageSizeCountry= 10;
     $scope.pageSizeCity=10;
     $scope.vendorsList=[];
     $scope.plataformList=[];
     $scope.profilesList=[];
     $scope.countrysList=[];
     $scope.citysList=[];
     $scope.totalVendors= 0;
     $scope.totalPlataform= 0;
     $scope.totalprofiles= 0;
     $scope.totalCountrys= 0;
     $scope.totalCity= 0;
     $scope.currentPageProfile= 1;
     $scope.activeModifyButton=true;
     $scope.activeModifyProfileBoton= true;
     $scope.activeModifyDomainButton= true;
     $scope.activeModifyCountryButton= true;
     $scope.activeModifyCityButton= true;

    $scope.hideSuccessDeleteAlert= function(){
       $scope.showSuccessDelete= false;
       }

     $scope.hideSuccessAddAlert= function(){
       $scope.showSuccessAdd= false;
     }

     $scope.hideSuccessEditAlert= function(){
        $scope.showSuccessEdit= false;
     }
     $scope.hideSuccessEditPlataformAlert=  function(){
        $scope.showSuccessPlataformEdit= false;
     }
     $scope.hideErrorEditPlataformAlert= function(){
        $scope.showErrorPlataformEdit= false;
     }
     $scope.hideSuccessDeletePlataformAlert= function(){
        $scope.showSuccessPlataformDelete= false;
     }

     $scope.hideErrorDeletePlataformAlert= function(){
        $scope.showErrorDeletePlataform= false;
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
     $scope.hideSuccessAddPlataformAlert= function(){
        $scope.showSuccessPlataformAdd= false;
     }
     $scope.hideErrorAddPlataformAlert= function(){
        $scope.showErrorPlataformAdd= false;
     }
     $scope.hideSuccessAddProfileAlert= function(){
        $scope.showSuccessProfileAdd= false;
     }
     $scope.hideErrorAddProfileAlert= function(){
        $scope.showErrorProfileAdd= false;
     }
     $scope.hideSuccessEditProfileAlert= function(){
        $scope.showSuccessProfileEdit= false;
     }
     $scope.hideErrorEditProfileAlert= function(){
        $scope.showErrorProfileEdit= false;
     }

     $scope.hideSuccessDeleteProfileAlert= function(){
        $scope.showSuccessProfileDelete= false;
     }
     $scope.hideErrorDeleteProfileAlert= function(){
        $scope.showErrorDeleteProfile= false;
     }
     $scope.hideSuccessAddDomainAlert= function(){
        $scope.showSuccessDomainAdd= false;
     }
     $scope.hideErrorAddDomainAlert= function(){
        $scope.showErrorDomainAdd= false;
     }
     $scope.hideSuccessEditDomainAlert= function(){
        $scope.showSuccessDomainEdit= false;
     }
     $scope.hideErrorEditDomainAlert= function(){
        $scope.showErrorDomainEdit= false;
     }
     $scope.hideSuccessDeleteDomainsAlert= function(){
        $scope.showSuccessDomainsDelete= false;
     }
     $scope.hideErrorDeleteDomainsAlert= function(){
        $scope.showErrorDeleteDomains= false;
     }
     $scope.hideSuccessAddCountryAlert= function(){
        $scope.showSuccessCountryAdd= false;
     }
     $scope.hideErrorAddCountryAlert= function(){
        $scope.showErrorCountryAdd= false;
     }
     $scope.hideSuccessEditCountryAlert= function(){
        $scope.showSuccessCountryEdit= false;
     }
     $scope.hideErrorEditCountryAlert= function(){
        $scope.showErrorCountryEdit= false;
     }
     $scope.hideSuccessDeleteCountryAlert= function(){
        $scope.showSuccessCountryDelete= false;
     }
     $scope.hideErrorDeleteCountryAlert= function(){
        $scope.showErrorDeleteCountry= false;
     }
     $scope.hideSuccessAddCityAlert= function(){
        $scope.showSuccessCityAdd= false;
     }
     $scope.hideErrorAddCityAlert= function(){
        $scope.showErrorCityAdd= false;
     }
     $scope.hideSuccessEditCityAlert= function(){
        $scope.showSuccessCityEdit= false;
     }
     $scope.hideSuccessDeleteCityAlert= function(){
        $scope.showSuccessCityDelete= false;
     }
     $scope.hideErrorDeleteCityAlert= function(){
        $scope.showErrorDeleteCity= false;
     }


     getResultsPage();
     getResultsPagePlataforms();
     getResultsPageProfiles($scope.currentPageProfile);
     getResultsPageDomains($scope.currentPageDomains);
     getResultsPageCountrys($scope.currentPageCountry);
     getResultsPageCity();

     $scope.pageChangedCountry= function(newPage){
        getResultsPageCountrys(newPage);
     }
     function getResultsPageCountrys(newPage){
        countryService.getCountries(newPage, $scope.pageSizeCountry).then(function(response){
            if(response.success){
                $scope.countrysList=[];
                $scope.totalCountrys= response.data[0].total;
                for(var i=0; i< response.data.length; i++){
                    var _id= parseInt(response.data[i].ID);
                    var country={id:_id, nombre: response.data[i].DESCRIPCION};

                    $scope.countrysList.push(country);
                }

            }else{
                $scope.error="Hubó un error en la conexión de la base de datos";
                $console.log('Error');
            }
        })
     }

     $scope.pageChangedDomain= function(newPage){
        getResultsPageDomains(newPage);
     }
    function getResultsPageDomains(newPage){
        domainServices.getAllDomains(newPage,$scope.pageSizeDomain).then(function(response){
            if(response.success){
            $scope.domainsList=[];
            $scope.totalDomains= response.data[0].total;
            for(var i=0; i<response.data.length; i++){
                var _id= parseInt(response.data[i].ID);
                var domain={id:_id, nombre:response.data[i].DESCRIPCION};
                $scope.domainsList.push(domain);
            }
            }else{
                $scope.error="Hubo un error en la conexión de la base de datos";
                $console.log('Error');
            }
        });

    }

    $scope.pageChangedProfile= function(newPage){
        getResultsPageProfiles(newPage);
    }
     function getResultsPageProfiles(newPage){
     jobsCitiService.getJobs(newPage,$scope.pageSizeProfile).then(function(response){
        if(response.success){
            $scope.profilesList=[];
            $scope.totalprofiles= response.data[0].total;
            for(var i= 0; i< response.data.length; i++){
             var _id=parseInt(response.data[i].ID);
             var profile={id: _id, nombre: response.data[i].DESCRIPCION};
            $scope.profilesList.push(profile);
            }
        }else{
            $scope.error="Hubo un error en la conexión de la base de datos";
            $console.log('Error');
        }
     });
     }
     function getResultsPageCity(){
        CitiesService.getCities().then(function(response){
            if(response.success){
                $scope.citysList=[];
                $scope.totalCity= response.data.length;
                for(var i=0; i < response.data.length; i++){
                    var _id= parseInt(response.data[i].Id);
                    var city={id:_id, nombre: response.data[i].ciudad, pais: response.data[i].pais};
                    $scope.citysList.push(city);
                }
            }else{
                $scope.error="Hubo un error en la conexión de la base de datos";
                $console.log('Error');
            }
        })
     }
     function getResultsPagePlataforms(){
        plataformServices.getallPlataforms().then(function(response){
            if(response.success){
                $scope.plataformList=[];
                $scope.totalPlataform= response.data.length;
                for(var i=0; i<response.data.length; i++){
                var _id= parseInt(response.data[i].Id);
                var plataform={id:_id, nombre: response.data[i].Descripcion, comentarios: response.data[i].Comentarios};
                $scope.plataformList.push(plataform);
                }
            }else{
                $scope.error= "Hubo un error en la conexión de la base de datos";
                $console.log('Error');
            }
        });
     }

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
    $scope.addNewCountry= function(){
        countryService.addCountry($scope.nameCountry).then(function(response){
            if(response.success){
            pristineCountryFields();
            $('#NewCountry').modal('hide');
            getResultsPageCountrys($scope.currentPageCountry);
            $scope.showSuccessCountryAdd= true;
            }else{
            $('#NewCountry').modal('hide');
            $scope.showErrorCountryAdd= true;
            }
        });
    }
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
    $scope.addNewDomain= function(){
        domainServices.addNewDomain($scope.nameDomain).then(function(response){
         if(response.success){
            pristineDomainFields();
            $("#NewDomain").modal('hide');
            getResultsPageDomains($scope.currentPageDomains);
            $scope.showSuccessDomainAdd= true;
         }else
         {
           $("#NewDomain").modal('hide');
           $scope.showErrorDomainAdd= true;
         }
        });
    }
    $scope.addNewProfile= function(){
        jobsCitiService.addNewJob($scope.nameProfile).then(function(response){
            if(response.success){
                pristinePerfilFields();
                $("#NewProfile").modal('hide');
                getResultsPageProfiles($scope.currentPageProfile);
                $scope.showSuccessProfileAdd= true;
            }else{
                $("#NewProfile").modal('hide');
                $scope.showErrorProfileAdd= true;
            }
        });
    }
    $scope.addNewPlataform= function(){
        plataformServices.addNewPlataform($scope.namePlataform, $scope.commentsPlataform).then(function(response){
            if(response.success){
                pristinePlataformFields();
                $('#NewPlataform').modal('hide');
                getResultsPagePlataforms();
                $scope.showSuccessPlataformAdd= true;
            }else{
                $('#NewPlataform').modal('hide');
                $scope.showErrorPlataformAdd= true;
            }
        });

    }
    $scope.addNewCity= function(){
        CitiesService.addCitys($scope.countryCity, $scope.nameCity).then(function(response){
            if(response.success){
                pristineCitiesFields();
                $('#NewCity').modal('hide');
                getResultsPageCity();
                $scope.showSuccessCityAdd= true;
            }else{
                $('#NewCity').modal('hide');
            }
        });
    }

    $scope.checkCountry= function(value){
        $scope.activeModifyCountryButton= false;
        $scope.idCountry= value;
    }

    $scope.checkVendor= function(value){
        $scope.activeModifyButton= false;
        $scope.idVendor= value;
    };

    $scope.activeModifyPlataformButton= true;

    $scope.checkPlataform= function(value){
        $scope.activeModifyPlataformButton= false;
        $scope.idPlataform= value;
    }
    $scope.checkProfile= function(value){
        $scope.activeModifyProfileBoton= false;
        $scope.idProfile= value;
    }
    $scope.checkDomains= function(value){
        $scope.activeModifyDomainButton= false;
        $scope.idDomain= value;
    }
    $scope.checkCity= function(value){
        $scope.activeModifyCityButton= false;
        $scope.idCity= value
    }
     $scope.clearFields= function(){
            pristineFields();
        }
        $scope.deleteCity= function(){
            if($window.confirm('you are gonna delete this, are you sure?')){
            deleteCityProcess();
            }
        }
        function deleteCityProcess(){
        CitiesService.deleteCity($scope.idCity).then(function(response){
            if(response.success){
                pristineEditCityFields();
                $('#EditCity').modal('hide');
                getResultsPageCity();
                $scope.showSuccessCityDelete= true;
            }else{
                $("#EditCity").modal('hide');
                $scope.showErrorDeleteCity= true;
            }
        })
        }
    $scope.deleteDomain= function(){
        if($window.confirm('you are gonna delete this, are you sure?')){
            deleteDomainProcess()
        }
    }
    function deleteDomainProcess(){
        domainServices.deleteDomain($scope.idDomain).then(function(response){
            if(response.success){
            pristineEditDomainFields();
            $('#EditDomain').modal('hide');
            getResultsPageDomains($scope.currentPageDomains);
            $scope.showSuccessDomainsDelete= true;
            }else{
            $('#EditDomain').modal('hide');
            $scope.showErrorDeleteDomains= true;
            }
        });
    }
    $scope.deleteProfile= function(){
        if($window.confirm('you are gonna delete this, are you sure?')){
            deleteProfileProcess();
        }
    }
    function deleteProfileProcess(){
    jobsCitiService.deleteProfile($scope.idProfile).then(function(response){
       if(response.success){
       pristineEditProfileFields();
        $('#EditProfile').modal('hide');
        getResultsPageProfiles($scope.currentPageProfile);
        $scope.showSuccessProfileDelete= true;
        }else{
            $('#EditProfile').modal('hide');
            $scope.showErrorDeleteProfile= true;
        }
    });
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

    $scope.deletePlataform = function(){
        if($window.confirm('you are gonna delete this, are you sure?')){
        deletePlataformProcess();
        }
    }
    function deletePlataformProcess(){
      plataformServices.deletePlataform($scope.idPlataform).then(function(response){
        if(response.success){
            pristineEditPlataformFields();
            $('#EditPlataform').modal('hide');
            getResultsPagePlataforms();
            $scope.showSuccessPlataformDelete= true;
        }
      });
    }
    $scope.deleteCountry= function(){
        if($window.confirm('you are gonna delete this, are you sure?')){
        deleteCountryProcess();
        }
    }
    function deleteCountryProcess(){
        countryService.deleteCountry($scope.idCountry).then(function(response){
        if(response.success){
            pristineEditCountryFields();
            $('#EditCountry').modal('hide');
            getResultsPageCountrys($scope.currentPageCountry);
            $scope.showSuccessCountryDelete= true;
        }
        });
    }
    $scope.showEditModal= function(){
        var vendorID= $scope.idVendor;
        $("#EditVendor").modal('show');
        returnObjectVendor(vendorID);

    }
    $scope.showEditModalProfile= function(){
        var profileId= $scope.idProfile;
        $("#EditProfile").modal('show');
        returnObjectProfile(profileId);
    };


    $scope.showEditModalPlataform= function(){
        var plataformId= $scope.idPlataform;
        $("#EditPlataform").modal('show');
        returnObjectPlataform(plataformId);
    }
    $scope.showEditModalDomain= function(){
        var dominioId=$scope.idDomain;
        $("#EditDomain").modal('show');
        returnObjectDomain(dominioId);
    }
    $scope.showEditModalCountry= function(){
        var countryId= $scope.idCountry;
        $('#EditCountry').modal('show');
        returnObjectCountry(countryId);
    }
    $scope.showEditModalCity= function(){
        var cityId= $scope.idCity;
        $('#EditCity').modal('show');
        returnObjectCity(cityId);
    }
    $scope.editProfileProcess= function()
    {
        var description=$scope.nameProfileEdit;
        var profileId= $scope.idProfile;
        jobsCitiService.updateProfile(profileId, description).then(function(response){
            if(response.success){
                pristineEditProfileFields();
                $("#EditProfile").modal('hide');
                getResultsPageProfiles($scope.currentPageProfile);
                $scope.showSuccessProfileEdit= true;

            }else{
            $("#EditProfile").modal('hide');
            $scope.showErrorProfileEdit= true;
            }
        });

    }
    $scope.EditCityProcess= function(){
        var nameCountry= $scope.countryCityEdit;
        var nameCity= $scope.nameCityEdit;
        CitiesService.updateCity(nameCountry,nameCity, $scope.idCity).then(function(response){
            if(response.success){
                pristineEditCityFields();
                $("#EditCity").modal('hide');
                getResultsPageCity();
                $scope.showSuccessCityEdit= true;
            }else{
                $('#EditCity').modal('hide');
                $scope.showErrorCityEdit= true;
            }

        });

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
        });
    };

    $scope.editPlataformProcess= function(){
        var nombre= $scope.namePlataformEdit;
        var comentarios= $scope.commentsPlataformEdit;
        var id= $scope.idPlataform;
        plataformServices.editPlataform(id,nombre,comentarios).then(function(response){
            if(response.success){
                pristineEditPlataformFields();
                $("#EditPlataform").modal('hide');
                getResultsPagePlataforms();
                $scope.showSuccessPlataformEdit= true;
            }else{
                $("#EditPlataform").modal('hide');
                $scope.showErrorPlataformEdit= true;
            }
        });

    }
    $scope.editDomainProcess= function(){
        var nombre=$scope.nameDomainEdit;
        var id=$scope.idDomain;
        domainServices.editDomain(id, nombre).then(function(response){
            if(response.success){
                pristineEditDomainFields();
                $("#EditDomain").modal('hide');
                getResultsPageDomains($scope.currentPageDomains);
                $scope.showSuccessDomainEdit= true;
            }else{
                $("#EditDomain").modal('hide');
                $scope.showErrorDomainEdit= true;
            }
        })
    };
    $scope.editCountryProcess= function(){
        var nombre= $scope.nameCountryEdit;
        var id= $scope.idCountry;
        countryService.editCountry(id, nombre).then(function(response){
            if(response.success){
                pristineEditCountryFields();
                $("#EditCountry").modal('hide');
                getResultsPageCountrys($scope.currentPageCountry);
                $scope.showSuccessCountryEdit=true;
            }else{
                $("#EditCountry").modal('hide');
                $scope.showErrorCountryEdit= true;
            }
        });
    }
    function returnObjectCity(cityId){
        CitiesService.getCitiesById(cityId).then(function(response){
            if(response.success){
                $scope.nameCityEdit= response.data[0].Descripcion;
                $scope.countryCityEdit= response.data[0].Id_Pais;
            }
        });
    }
    function returnObjectVendor(vendorID){
        vendorCatService.getProviderById(vendorID).then(function(response){
            if(response.success){
                $scope.vendorNameEdit = response.data[0].DESCRIPCION;
            }
        });
    };
    function returnObjectProfile(profileId){
        jobsCitiService.getProfileById(profileId).then(function(response){
            if(response.success){
                $scope.nameProfileEdit= response.data[0].DESCRIPCION;
            }
        });
    }
    function returnObjectPlataform(plataformId){
        plataformServices.getPlataformById(plataformId).then(function(response){
            if(response.success){
                $scope.namePlataformEdit= response.data[0].Descripcion;
                $scope.commentsPlataformEdit= response.data[0].Comentarios;
            }
        });
       }
    function returnObjectDomain(domainId){
        domainServices.getDomainById(domainId).then(
        function(response){
            if(response.success){
                $scope.nameDomainEdit= response.data[0].DESCRIPCION;
            }
        });
    }
    function returnObjectCountry(countryId){
        countryService.getCountryById(countryId).then(function(response){
            if(response.success){
                $scope.nameCountryEdit= response.data[0].DESCRIPCION;
            }
        })
    }

    function pristineFields(){
            $scope.AddVendor.$setPristine();
            $scope.name= null;
    }
    function pristinePlataformFields(){
            $scope.AddPlataform.$setPristine();
            $scope.namePlataform= null;
            $scope.commentsPlataform= null;
        }
    function pristineCountryFields(){
            $scope.AddCountry.$setPristine();
            $scope.nameCountry= null;
    }
    function pristineCitiesFields(){
            $scope.AddCity.$setPristine();
            $scope.countryCity=null;
            $scope.nameCity= null;
    }
    function pristineEditCountryFields(){
            $scope.EditCountry.$setPristine();
            $scope.nameCountryEdit= null;
    }
    function pristineEditPlataformFields(){
            $scope.EditPlataform.$setPristine();
            $scope.namePlataformEdit=null;
            $scope.commentsPlataformEdit= null;
    }
    function pristineEditFields(){
        $scope.EditVendor.$setPristine();
        $scope.vendorNameEdit=null;
    }
    function pristineEditProfileFields(){
        $scope.EditProfile.$setPristine();
        $scope.nameProfileEdit=null;
    }
    function pristinePerfilFields(){
        $scope.AddProfile.$setPristine();
        $scope.nameProfile= null;
    }
    function pristineDomainFields(){
        $scope.AddDomain.$setPristine();
        $scope.nameDomain= null;
    }
    function pristineEditDomainFields(){
        $scope.EditDomain.$setPristine();
        $scope.nameDomainEdit= null;
    }
    function pristineEditCityFields(){
        $scope.EditCity.$setPristine();
        $scope.countryCityEdit= null;
        $scope.nameCityEdit= null;
    }
    if ($cookies.get("cat") != "true"){
        $location.path("/principal");
    }



    var $this = $scope;
    
    $this.showCatalogTab = function( tabName){
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