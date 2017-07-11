var angular = require('angular');

var configCtrl = function($scope, $location, $cookies, userService, messagesService){

    var $this = $scope;
    $this.editPwd = false;
    getUser();
    $this.cancel = function(){
        $location.path("/principal");
        getUser();
    };

    $this.editPassword = function(editPwd){
        $this.editPass = editPwd;
    };

    $this.editDataUser = function(){
        updateUser();
    };

    var updateUser = function(){
        var newPass = !$this.editPwd ? $this.pwd : $this.editDataNewPwd;
        var petition = false;
        userService.updateDataUser(
            $cookies.get("user"),
            $this.editDataFirstname,
            $this.editDataSecondName || '',
            $this.editDataLastName,
            $this.editDataMothersLastName || '',
            $this.editDataEmail,
            $this.pwd,
            newPass
        )
        .then(function(data){
            petition = data.success;
            if (petition){
                messagesService.handlerMessages("DATA_UPDATE_SUCCESSFULLY",true);
                getUser();
                $this.editPwd = false;
            }else if (!petition && data.codigo == 13){
                messagesService.handlerMessages("PASSWORD_INCORRECT",false);
                $scope.pwd = '';
                $this.editPwd = false;
            }else{
                messagesService.handlerMessages("ERROR_OCURRED_DATA_UPDATE",false);
            }
        });
    };

    function getUser(){
        var id = $cookies.get("user");
        userService.getUserById(id).then(function(response){
            $scope.editDataFirstname = response.data[0].Primer_Nombre;
            $scope.editDataSecondName = response.data[0].Segundo_Nombre;
            $scope.editDataLastName = response.data[0].Apellido_Paterno;
            $scope.editDataMothersLastName = response.data[0].ApellidoMaterno;
            $scope.editDataEmail =response.data[0].Email;
            $scope.pwd = '';
        });
    };
};

module.exports = angular.module('app.users').controller('configCtrl',configCtrl);