'use strict'

var navController= function ($translate, locale,localeService,sessionManager,$location,$cookies, logoutService) {
  
  var $this = this;

  $this.language = locale.getDefaultLaguage();

  $this.changeLanguage = function () {
      $translate.use(this.language);
  }

  $this.logout = function (){
      var applicationId= $cookies.get('applicationId');
      logoutService.logout(applicationId)
      .then(function(response){
              if(response.data.success){
              $cookies.put('IsLogged', 'false');
              sessionManager.notLoged();
              $location.path("/login");
            }
       });

    }

};
module.exports =angular.module("app.navbar").controller("navController",navController);