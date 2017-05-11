'use strict';
/*
 * Unit tests for src/modules/login/controllers/loginController.js
 */

describe('Modulo app.login', function() {
    var $rootScope;
    var $controller;

    // inject the HTML fixture for the tests
    beforeEach(function() {
        module('app.login');
    });

    beforeEach(inject(function(_$controller_) {
        $controller = _$controller_;
    }));

    describe("Login controller", function() {
        var $scope = {};

        it('Debe validar que la contraseña tenga minimo 8 caracteres', function() {
            var controller = $controller('loginCtrl', { $scope: $scope });
            var input = "F2h*f3H_4";
            var output = true;
            expect($scope.validateLengthPassword(input)).toEqual(true);
        });

    });

});