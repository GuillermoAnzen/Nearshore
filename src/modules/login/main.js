var angular = require('angular');

/**
 * @ngdoc overview
 * @name app.login
 * @requires angular-route
 * @requires angular-sanitize
 * @requires angular-translate
 * @description
 * This is the aplication's main module login.
 * In here do require the i18n files and they handle the routes of the application.
 */


module.exports = angular.module('app.login', [
    require('angular-route'),
    require('angular-sanitize'),
    require('angular-translate')
]).config(['$routeProvider', '$translateProvider', 'localeProvider', '$httpProvider', function($routeProvider, $translateProvider, localeProvider, $httpProvider) {

    /***** i18n Configuration *****/
    localeProvider.init(require.context('./i18n/', false, /.js$/));
    /***** i18n Configuration *****/

    $routeProvider.when('/login', {
        template: require('./views/login.html'),
        controller: 'loginCtrl'


    });
    /*$routeProvider.when('/principal', {
        template: require('./views/main.html'),
        controller: 'loginCtrl'
});*/
  $httpProvider.interceptors.push(function($q,$location, $cookies){
                                  return{
                                  'response': function(response){
                                          if(response.data.success=="false" && response.data.mensaje == "Unauthorized"){
                                              $cookies.remove('IsLogged');
                                              $cookies.remove('applicationId');
                                              $location.path("/login");
                                          }
                                          return response
                                      },
                                  'responseError': function(rejection){
                                      return $q.reject(rejection);
                                  }
                                  };
                                  });
}]).run(function($rootScope, $location,sessionManager, $cookies){
    $rootScope.$on("$routeChangeStart", function(event, next, current){
        var UserLogin= $cookies.get('IsLogged');
        if(UserLogin== null){
        if(next.templateUrl==="views/login.html"){
        }else{
            $location.path("login");
            sessionManager.notLoged();
        }
        }
    })
});


var loadFiles = require.context('./js', true, /.js$/);
for (var i = 0; i < loadFiles.keys().length; i++) {
    loadFiles(loadFiles.keys()[i]);
}
require('./css/index.less');