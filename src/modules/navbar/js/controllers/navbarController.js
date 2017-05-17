'use strict'

var navController= function ($translate, locale,localeService,sessionManager,$location,$cookies, logoutService) {
  
  var $this = this;

  $this.language = locale.getDefaultLaguage();

  $this.changeLanguage = function () {
      $translate.use(this.language);
  }

  if ($cookies.get('IsLogged')=='true'){
    $this.getLoged = true;
    $("#userProfile").attr("class","form-group dropdown");
    $("#navbarMain").attr("class","col-sm-9");
    $("#userProfileName").html($cookies.get('username') + ' <span class="caret"></span>');
  }
  else
    $this.getLoged = false;

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