'use strict'

var navController= function ($translate, locale,localeService,sessionManager,$location) {
  
  var $this = this;

  $this.language = locale.getDefaultLaguage();

  $this.changeLanguage = function () {
      $translate.use(this.language);
  }

  $this.logout = function (){
      sessionManager.notLoged();
      $location.path("/login");
    }

};
module.exports =angular.module("app.navbar").controller("navController",navController);