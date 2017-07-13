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
var catalogCtrl = function($scope, $location,localeService, $cookies, vendorCatService, $window, plataformServices, jobsCitiService) {

     $scope.currentPage = 1;
     $scope.pageSize = 10;
     $scope.pageSizeplataform=10;
     $scope.pageSizeProfile= 10;
     $scope.vendorsList=[];
     $scope.plataformList=[];
     $scope.profilesList=[];
     $scope.totalVendors= 0;
     $scope.totalPlataform= 0;
     $scope.totalprofiles= 0;
     $scope.currentPageProfile= 1;
     $scope.activeModifyButton=true;
     $scope.activeModifyProfileBoton= true;

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

     getResultsPage();
     getResultsPagePlataforms();
     getResultsPageProfiles($scope.currentPageProfile);

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
    $scope.addNewProfile= function(){
        jobsCitiService.addNewJob($scope.nameProfile).then(function(response){
            if(response.success){
                pristinePerfilFields();
                $("#NewProfile").modal('hide');
                getResultsPageProfiles($scope.currentPageProfile);
                $scope.showSuccessProfileAdd= true;
            }else
                $("#NewProfile").modal('hide');
                $scope.showErrorProfileAdd= true;
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
     $scope.clearFields= function(){
            pristineFields();
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
        getResultsPageProfiles();
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

    function pristineFields(){
            $scope.AddVendor.$setPristine();
            $scope.name= null;
    }
    function pristinePlataformFields(){
            $scope.AddPlataform.$setPristine();
            $scope.namePlataform= null;
            $scope.commentsPlataform= null;
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