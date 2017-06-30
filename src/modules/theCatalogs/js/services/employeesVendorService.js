'use strict';
var angular = require('angular');

var employeesVendorService = function ($http, $q, $cookies){

    var server = "http://54.153.120.183/";

    this.getEmployeesPerVendor = function(_idVendor){
        var endpoint = server + "catalogsms/empProvider/employeesVendor/"+_idVendor;
        var appID = $cookies.get('applicationId');
        var content_type = 'application/json; charset=utf-8';
        var defered=$q.defer();
        var promise= defered.promise;
        var config = {
            headers : { 
                'Content-Type': content_type,
                'ApplicationID': appID
            }
        };
        $http.get(endpoint, config).then(function(response){
            defered.resolve(response.data);
        });
        return promise;
    };

    this.getDetailsEmp = function(_id){
        var endpoint = server + "catalogsms/empProvider/get/"+_id;
        var appID = $cookies.get('applicationId');
        var content_type = 'application/json; charset=utf-8';
        var defered=$q.defer();
        var promise= defered.promise;
        var config = {
            headers : { 
                'Content-Type': content_type,
                'ApplicationID': appID
            }
        };
        $http.get(endpoint, config).then(function(response){
            defered.resolve(response.data);
        });
        return promise;
    };

    this.getAppsByEmployee = function(_id, _index, _rows){
        var endpoint = server + "catalogsms/proveedores/appsProvider/";
        var appID = $cookies.get('applicationId');
        var content_type = 'application/json; charset=utf-8';
        var defered=$q.defer();
        var promise= defered.promise;
        var data = {
            'index': _index,
            'rows': _rows || 1,
            'idEmployee': _id
        };
        var config = {
            headers : { 
                'Content-Type': content_type,
                'ApplicationID': appID
            }
        };
        $http.post(endpoint, data, config).then(function(response){
            defered.resolve(response.data);
        });
        return promise;
    };

    this.addEmployee = function(
        _vendorEmpP,
            _jobsEmpP,
            _codeEmpP,
            _nameEmpP,
            _SNameEmpP,
            _PLnameEmpP,
            _SSnameEmpP,
            _citiesEmpP,
            _ldCelEmpP,
            _celEmpP,
            _ldTelOEmpP,
            _telOEmpP,
            _ldOfficeEmpP,
            _telOfficeEmpP,
            _extOfficeEmpP,
            _emailEmpP,
            _soeidEmpP,
            _emailCitiEmpP,
            _telCitiEmpP,
            _extCitiEmpP,
            _reports2EmpP,
            _commentEmpP
    ){
        var endpoint = server + "catalogsms/empProvider/addEmployee/";
        var appID = $cookies.get('applicationId');
        var content_type = 'application/json; charset=utf-8';
        var defered=$q.defer();
        var promise= defered.promise;
        var data = {
	        'idProvider': _vendorEmpP,
	        'idEmployee': _codeEmpP,
	        'firstLastName': _PLnameEmpP,
	        'secondLastName': _SSnameEmpP || " ",
            'firstName': _nameEmpP,
	        'secondName': _SNameEmpP || " ",
	        'ldCelular': _ldCelEmpP,
	        'personalNumber': _celEmpP,
	        'ldParticular': _ldTelOEmpP,
	        'particularTelephone': _telOEmpP,
	        'personalEmail': "",
            'puesto': {
                'id': _jobsEmpP
            },
            'country': {
                'id': _citiesEmpP
            },
	        'ldProvider': _ldOfficeEmpP || " ",
	        'telephoneProvider': _telOfficeEmpP || " ",
	        'extension': _extOfficeEmpP,
	        'emailProvider': _emailEmpP,
	        'soeId': _soeidEmpP,
	        'ldCiti': "",
	        'citiTelephone': _telCitiEmpP,
	        'extCiti': _extCitiEmpP,
	        'emailCiti': _emailCitiEmpP,
	        'idReportaA': _reports2EmpP,
	        'comments': _commentEmpP 
        };
        var config = {
            headers : { 
                'Content-Type': content_type,
                'ApplicationID': appID
            }
        };
        $http.post(endpoint, data, config).then(function(response){
            defered.resolve(response.data);
        });
        return promise;
    };

    this.deleteEmployee = function(_id){
        var endpoint = server + "catalogsms/empProvider/delete/"+_id;
        var appID = $cookies.get('applicationId');
        var content_type = 'application/json; charset=utf-8';
        var defered=$q.defer();
        var promise= defered.promise;
        var config = {
            headers : { 
                'Content-Type': content_type,
                'ApplicationID': appID
            }
        };
        $http.delete(endpoint, config).then(function(response){
            defered.resolve(response.data);
        });
        return promise;
    };

    this.updateEmployee = function(
        _idEmp,
        _vendorEmpP,
            _jobsEmpP,
            _codeEmpP,
            _nameEmpP,
            _SNameEmpP,
            _PLnameEmpP,
            _SSnameEmpP,
            _citiesEmpP,
            _ldCelEmpP,
            _celEmpP,
            _ldTelOEmpP,
            _telOEmpP,
            _ldOfficeEmpP,
            _telOfficeEmpP,
            _extOfficeEmpP,
            _emailEmpP,
            _soeidEmpP,
            _emailCitiEmpP,
            _telCitiEmpP,
            _extCitiEmpP,
            _reports2EmpP,
            _commentEmpP
    ){
        var endpoint = server + "catalogsms/empProvider/update/";
        var appID = $cookies.get('applicationId');
        var content_type = 'application/json; charset=utf-8';
        var defered=$q.defer();
        var promise= defered.promise;
        var data = {
            'id': _idEmp,
	        'idProvider': _vendorEmpP,
	        'idEmployee': _codeEmpP,
	        'firstLastName': _PLnameEmpP,
	        'secondLastName': _SSnameEmpP || " ",
            'firstName': _nameEmpP,
	        'secondName': _SNameEmpP || " ",
	        'ldCelular': _ldCelEmpP,
	        'personalNumber': _celEmpP,
	        'ldParticular': _ldTelOEmpP,
	        'particularTelephone': _telOEmpP,
	        'personalEmail': "",
            'puesto': {
                'id': _jobsEmpP
            },
            'country': {
                'id': _citiesEmpP
            },
	        'ldProvider': _ldOfficeEmpP || " ",
	        'telephoneProvider': _telOfficeEmpP || " ",
	        'extension': _extOfficeEmpP,
	        'emailProvider': _emailEmpP,
	        'soeId': _soeidEmpP,
	        'ldCiti': "",
	        'citiTelephone': _telCitiEmpP,
	        'extCiti': _extCitiEmpP,
	        'emailCiti': _emailCitiEmpP,
	        'idReportaA': _reports2EmpP,
	        'comments': _commentEmpP 
        };
        var config = {
            headers : { 
                'Content-Type': content_type,
                'ApplicationID': appID
            }
        };
        $http.put(endpoint, data, config).then(function(response){
            defered.resolve(response.data);
        });
        return promise;
    };

    return{
        getEmployeesPerVendor: this.getEmployeesPerVendor,
        getDetailsEmp: this.getDetailsEmp,
        getAppsByEmployee: this.getAppsByEmployee,
        addEmployee: this.addEmployee,
        deleteEmployee: this.deleteEmployee,
        updateEmployee: this.updateEmployee
    };
}
module.exports= angular.module("app.locale").service("employeesVendorService", employeesVendorService);