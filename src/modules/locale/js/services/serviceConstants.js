'use strict';
var angular = require('angular');

var constantsService = function (){
    
    /*
    parameter: 
        translate: value to put in translate attribute to use it in i18n.
        success: value to put in class attribute to change the alert color.
     */
    this.server = function(){
        return "http://54.153.120.183";
    };

    return{
        server: this.server
    };
}
module.exports= angular.module("app.locale").service("constantsService", constantsService);