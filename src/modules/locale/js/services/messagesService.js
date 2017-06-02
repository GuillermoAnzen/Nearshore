'use strict';
var angular = require('angular');

var messagesService = function ($http, $q, $cookies){
    
    this.handlerMessages = function(translate,clase){
        $("#messagesHandler").attr("class",""+clase);
        //$("#message").attr("translate",""+translate);
        $("#message").html(translate);
    };

    this.closeMessageHanlder = function(){
        $("#messagesHandler").modal('hide');
    };

    return{
        handlerMessages: this.handlerMessages,
        closeMessageHanlder: this.closeMessageHanlder
    };
}
module.exports= angular.module("app.locale").service("messagesService", messagesService);