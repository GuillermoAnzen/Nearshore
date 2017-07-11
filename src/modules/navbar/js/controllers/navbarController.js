'use strict'

var navController= function ($translate, locale,localeService,sessionManager,$location,$cookies, logoutService) {
  
  var $this = this;
  var lan = $cookies.get("i");
    if (!lan){
      $this.language = locale.getDefaultLaguage();
      $translate.use(this.language);
    }else{
      $translate.use(lan);
      $this.language = lan;
    }

  $this.changeLanguage = function () {
      $translate.use(this.language);
      $cookies.put("i",this.language);
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
              $cookies.remove('IsLogged');
              $cookies.remove('applicationId');
              $cookies.remove('counter');
              sessionManager.notLoged();
              $location.path("/login");
            }
       });

    }

    $this.configuration = function(){
        $location.path("/configuration");
    };

};
module.exports =angular.module("app.navbar").controller("navController",navController);