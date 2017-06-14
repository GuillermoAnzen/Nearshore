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
var userCtrl = function($scope, $location,localeService, userService, $timeout, $window) {

    var $this = $scope;
    $this.urlInclude='addNewUser.html';

    $scope.currentPage = 1;
    $scope.pageSize = 10;
    $scope.usersList=[];
    $scope.profiles=[];
    $scope.domains=[];
    $scope.vendors=[];
    var index= 1;
    $scope.totalUsers= 0;
    $scope.showSuccessAdd= false;
    $scope.showErrorAdd= false;
    $scope.showSuccessEdit= false;
    $scope.showErrorEdit= false;

    getResultsPage($scope.currentPage);

    $scope.clearFields= function(){
        pristineFields();
    }

    function pristineFields(){
            $scope.AddUser.$setPristine();
            $scope.firstname= null;
            $scope.secondName= null;
            $scope.lastName= null;
            $scope.mothersLastName= null;
            $scope.email=null;
            $scope.profile= null;
            $scope.pwd= null;
    }
    $scope.pageChanged= function(newPage){
        getResultsPage(newPage);
    };
      function getResultsPage(newPage){
        userService.getUsers(newPage,$scope.pageSize).then(function(response){
            if(response.success){
                $scope.usersList=[];
                $scope.totalUsers= response.data[0].total;
                for(var i=0; i<response.data.length; i++){
                    var _estatus= response.data[i].Activo == "1" ? "Activo" : "Inactivo";
                    var _id= parseInt(response.data[i].Id_Usuarios);
                    var user= {id: _id, nombre:response.data[i].nombre, correo: response.data[i].Email, perfil: response.data[i].Descripcion, estatus:_estatus };
                    $scope.usersList.push(user);
                }
            }else{
                $scope.error="Hubo un error en la conexión con la base de dato";
                $console.log('Error');
                }
        });


      }

    userService.getAllProfiles().then(function(response){
        if(response.success){
           for(var i= 0; i< response.data.length; i++){
           var _value = parseInt(response.data[i].ID_Perfil);
            var profile={value: _value, profile: response.data[i].DESCRIPCION};
            $scope.profiles.push(profile);
           }
        }
    });

    $scope.status=[{ value:1, status:'Activo'},
                   { value:0, status:'Inactivo'}];


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

    $scope.activeModifyButton=true;

    $scope.checkUser= function(value){
    $scope.activeModifyButton= false;
    $scope.idUser= value;
    }
    $scope.showEditModal= function(){
        var userid= $scope.idUser;
        $("#EditUser").modal('show');
        returnObjectUser(userid);

    }
    function returnObjectUser(id){
        userService.getUserById(id).then(function(response){
        $scope.firstNameEdit= response.data[0].Primer_Nombre;
        $scope.secondNameEdit= response.data[0].Segundo_Nombre;
        $scope.lastNameEdit= response.data[0].Apellido_Paterno;
        $scope.mothersLastNameEdit= response.data[0].ApellidoMaterno;
        $scope.emailEdit=response.data[0].Email;
        $scope.profileEdit= response.data[0].Id_Perfil;
        $scope.pwdEdit= response.data[0].Clave;
        $scope.statusEdit= response.data[0].Activo == 1 ? true: false ;

        });
    }
    function pristineEditFields(){
        $scope.EditUser.$setPristine();
        $scope.firstNameEdit= null;
        $scope.secondNameEdit= null;
        $scope.lastNameEdit= null;
        $scope.mothersLastNameEdit= null;
        $scope.emailEdit= null;
        $scope.profileEdit= null;
        $scope.pwdEdit= null;
        $scope.statusEdit= null;
    }
    $scope.OrderBy= function(x){
        $scope.MyOrderBy=x;
    }
    $scope.addNewUser= function(){
        if($scope.secondName == null)
            $scope.secondName="";
        if($scope.mothersLastName== null)
            $scope.mothersLastName="";
        userService.newUser($scope.firstname, $scope.secondName, $scope.lastName, $scope.mothersLastName, $scope.email, $scope.profile, $scope.pwd)
          .then(function(response){
          if(response.success){
                pristineFields();
                $("#NewUser").modal('hide');
                getResultsPage($scope.currentPage);
                $scope.showSuccessAdd= true;
          }else{
                $("#NewUser").modal('hide');
                $scope.showErrorAdd= true;
          }
          });
    }
    $scope.editUserProcess= function(){
        if($scope.secondNameEdit== null)
            $scope.secondNameEdit="";
        if($scope.mothersLastNameEdit== null)
            $scope.mothersLastNameEdit="";
                var status= $scope.statusEdit? 1:0;
         userService.updateUser($scope.idUser, $scope.firstNameEdit, $scope.secondNameEdit, $scope.lastNameEdit, $scope.mothersLastNameEdit, $scope.emailEdit, $scope.profileEdit, $scope.pwdEdit, status)
            .then(function(response){
                if(response.success){
                pristineEditFields();
                $("#EditUser").modal('hide');
                    getResultsPage($scope.currentPage);
                    $scope.showSuccessEdit= true;
                }else{
                    $("#EditUser").modal('hide');
                    $scope.showErrorEdit= true;
                }

            });
    }
    $scope.deleteUser= function(){
        if($window.confirm('you are gonna delete this user, are you sure?')){
            deleteUserProcess();
        }
    }

    function deleteUserProcess(){
        userService.deleteUser($scope.idUser)
        .then(function(response){
            if(response.success){
                pristineEditFields();
                $("#EditUser").modal('hide');
                  getResultsPage($scope.currentPage);
                  $scope.showSuccessDelete= true;
            }else{
               $("#EditUser").modal('hide');
               $scope.showErrorDelete= true;
            }
        });

    }


    $this.showUserTab = function(evt, tabName){
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

module.exports = angular.module("app.users").controller('userCtrl', userCtrl);