'use strict';
var angular = require('angular');

var messagesService = function ($http, $q, $cookies,$rootScope){
    
    /*
    parameter: 
        translate: value to put in translate attribute to use it in i18n.
        success: value to put in class attribute to change the alert color.
     */
    this.handlerMessages = function(translate,success){
        var clase = "alert alert-danger alert-dismissable messagesHandler";
        if (success)
            clase = "alert alert-success alert-dismissable messagesHandler";
        $("#messagesHandler").attr("class",clase);
        $rootScope.translate = translate;
        $("#messagesHandler").fadeIn(100);
        setTimeout(function(){
            $("#messagesHandler").fadeOut(1500);
        },2500);
    };

    this.closeMessageHanlder = function(){
        $rootScope.translate = "";
        $("#messagesHandler").attr("class","");
    };

    return{
        handlerMessages: this.handlerMessages,
        closeMessageHanlder: this.closeMessageHanlder
    };
}
module.exports= angular.module("app.locale").service("messagesService", messagesService);