'use strict';
var angular = require('angular');

var applicationService = function ($http, $q, $cookies){
    
    var server = "http://54.153.120.183/";
    var content_type = 'application/json; charset=utf-8';

   /* DETAILS APPLICATION PER ID */
    this.getApplicationDetails = function(_id){
        var endpoint = server + "appsms/aplicaciones/idAplicacion/" + _id;
        var appID = $cookies.get('applicationId');    
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
    }

    /* 
     * ADD NEW APPLICATION
     */
    this.addAplication = function (_csiID,_idDom,_ptbId,_descCorta,_descLarga,_idL1,_idL2,_idL3,_idP1,_idP2,_idP3,_coment){
        var endpoint = server + "catalogsms/aplicaciones/";
        var appID = $cookies.get("applicationId");
        var defered = $q.defer();
        var promise = defered.promise;
        var data = {
            "csiId": _csiID,
            "idDominio": _idDom,
            "ptbId": _ptbId,
            "descripcionCorta": _descCorta,
            "descripcionLarga": _descLarga,
            "idL1": _idL1,
            "idL2": _idL2,
            "idL3": _idL3,
            "idPlat1": _idP1,
            "idPlat2": _idP2,
            "idPlat3": _idP3,
            "comentarios": _coment
        };
        var config = {
            headers: {
                'Content-Type': content_type,
                'ApplicationID': appID
            }
        };
        $http.post(endpoint, data, config).then(function(response){
            defered.resolve(response.data);
        });
        return promise;
    };

    this.updateApplication = function(_csiID,_idDom,_ptbId,_descCorta,_descLarga,_idL1,_idL2,_idL3,_idP1,_idP2,_idP3,_coment){
        var endpoint = server + "catalogsms/aplicaciones/"+_csiID;
        var appID = $cookies.get("applicationId");
        var defered = $q.defer();
        var promise = defered.promise;
        var data = {
            "idDominio": _idDom,
            "ptbId": _ptbId,
            "descripcionCorta": _descCorta,
            "descripcionLarga": _descLarga,
            "idL1": _idL1,
            "idL2": _idL2,
            "idL3": _idL3,
            "idPlat1": _idP1,
            "idPlat2": _idP2,
            "idPlat3": _idP3,
            "comentarios": _coment
        };
        var config = {
            headers: {
                'Content-Type': content_type,
                'ApplicationID': appID
            }
        };
        $http.put(endpoint, data, config).then(function(response){
            defered.resolve(response.data);
        });
        return promise;
    };

    this.getDetailsL = function(_idApp,_level){
        var endpoint = server + "catalogsms/aplicaciones/detailsL"+_level+"/"+_idApp;
        var appID = $cookies.get("applicationId");
        var defered = $q.defer();
        var promise = defered.promise;
        var config = {
            headers: {
                'Content-Type': content_type,
                'ApplicationID': appID
            }
        };
        $http.get(endpoint, config).then(function(response){
            defered.resolve(response.data);
        });
        return promise;
    };

    this.updateSupportL = function(_id, _resp_prov, _back_prov, _lider_prov, _p_man_prov, _d_man_prov, _man_bnmx, _lead_bnmx, _analista_bnmx,_level){
        var endpoint = server + "catalogsms/aplicaciones/detailsSupport/"+_level;
        var appID = $cookies.get("applicationId");
        var defered = $q.defer();
        var promise = defered.promise;
        var data = {
            "idAplicacion": _id,
            "idAnalistaB": _analista_bnmx,
            "idLiderB": _lead_bnmx,
            "idGerenteB": _man_bnmx,
            "idResponsableP": _resp_prov,
            "idBackupP": _back_prov,
            "idLiderP": _lider_prov,
            "idPManagerP": _p_man_prov,
            "idDManagerP": _d_man_prov
        };
        var config = {
            headers: {
                'Content-Type': content_type,
                'ApplicationID': appID
            }
        };
        $http.put(endpoint, data, config).then(function(response){
            defered.resolve(response.data);
        });
        return promise;
    };

    this.deleteApplication = function(_id){
        var endpoint = server + "catalogsms/aplicaciones/"+_id;
        var appID = $cookies.get("applicationId");
        var defered = $q.defer();
        var promise = defered.promise;
        var config = {
            headers: {
                'Content-Type': content_type,
                'ApplicationID': appID
            }
        };
        $http.delete(endpoint, config).then(function(response){
            defered.resolve(response.data);
        });
        return promise;
    };

    return{
        getApplicationDetails: this.getApplicationDetails,
        addAplication: this.addAplication,
        updateApplication: this.updateApplication,
        getDetailsL: this.getDetailsL,
        updateSupportL: this.updateSupportL,
        deleteApplication: this.deleteApplication
    };
}
module.exports= angular.module("app.locale").service("applicationService", applicationService);