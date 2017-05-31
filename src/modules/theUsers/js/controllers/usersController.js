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
var userCtrl = function($scope, $location,localeService) {

    var $this = $scope;
    $this.urlInclude='addNewUser.html';

    $scope.currentPage = 1;
    $scope.pageSize = 10;
        //Objeto de ejemplo
    $scope.usersList=[
        {id: 1, nombre:'SuperUsuario', correo:'jfernandez@gmail.com', perfil: 'Administrador', estatus:'Activo'},
        {id: 2,nombre:'Jorge', correo:'jfernandez@gmail.com', perfil:'Usuario', estatus:'Activo'},
        {id: 3, nombre:'Guillermo Cruz', correo:'gcruz@anzen.com.mx', perfil:'SuperUsuario', estatus:'Activo'},
        {id: 4,nombre:'Juan David', correo:'jdavid@anzen.com.mx', perfil:'Usuario', estatus:'Activo'},
        {id: 5, nombre:'Anibal Gonzales', correo:'agonzales@anzen.com.mx', perfil:'Usuario', estatus:'Inactivo'},
        {id: 6, nombre:'SuperUsuario', correo:'jfernandez@gmail.com', perfil: 'Administrador', estatus:'Activo'},
        {id: 7,nombre:'Jorge', correo:'jfernandez@gmail.com', perfil:'Usuario', estatus:'Activo'},
        {id: 8, nombre:'Guillermo Cruz', correo:'gcruz@anzen.com.mx', perfil:'SuperUsuario', estatus:'Activo'},
        {id: 9,nombre:'Juan David', correo:'jdavid@anzen.com.mx', perfil:'Usuario', estatus:'Activo'},
        {id: 10, nombre:'Anibal Gonzales', correo:'agonzales@anzen.com.mx', perfil:'Usuario', estatus:'Inactivo'},
        {id: 11, nombre:'SuperUsuario2', correo:'jfernandez@gmail.com', perfil: 'Administrador', estatus:'Activo'},
        {id: 12,nombre:'Jorge2', correo:'jfernandez@gmail.com', perfil:'Usuario', estatus:'Activo'},
        {id: 13, nombre:'Guillermo Cruz2', correo:'gcruz@anzen.com.mx', perfil:'SuperUsuario', estatus:'Activo'},
        {id: 14,nombre:'Juan David2', correo:'jdavid@anzen.com.mx', perfil:'Usuario', estatus:'Activo'},
        {id: 15, nombre:'Anibal Gonzales2', correo:'agonzales@anzen.com.mx', perfil:'Usuario', estatus:'Inactivo'},
        {id: 16, nombre:'SuperUsuario2', correo:'jfernandez@gmail.com', perfil: 'Administrador', estatus:'Activo'},
        {id: 17,nombre:'Jorge2', correo:'jfernandez@gmail.com', perfil:'Usuario', estatus:'Activo'},
        {id: 18, nombre:'Guillermo Cruz2', correo:'gcruz@anzen.com.mx', perfil:'SuperUsuario', estatus:'Activo'},
        {id: 19,nombre:'Juan David2', correo:'jdavid@anzen.com.mx', perfil:'Usuario', estatus:'Activo'},
        {id: 20, nombre:'Anibal Gonzales2', correo:'agonzales@anzen.com.mx', perfil:'Usuario', estatus:'Inactivo'}
        ];



    $scope.activeModifyButton=true;

      $scope.pageChangeHandler = function(num) {
        console.log('going to page ' + num);
      };
    $scope.checkUser= function(value){
    $scope.activeModifyButton= false;
    }
    $scope.OrderBy= function(x){
        $scope.MyOrderBy=x;
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