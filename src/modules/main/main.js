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


module.exports = angular.module('app.main', [
    require('angular-route'),
    require('angular-sanitize'),
    require('angular-translate')
]).config(['$routeProvider', '$translateProvider','localeProvider', function($routeProvider, $translateProvider,localeProvider) {

    /***** i18n Configuration *****/
    localeProvider.init(require.context('./i18n/', false, /.js$/));
    /***** i18n Configuration *****/

    $routeProvider.when('/principal', {
        template: require('./views/main.html'),
        controller: 'mainCtrl',
        controllerAs: '$ctrl'
    });

    $routeProvider.when('/change', {
        template: require('./views/test.html'),
        controller: 'mainCtrl',
        controllerAs: '$ctrl'
    });

}]);


var loadFiles = require.context('./js', true, /.js$/);
for (var i = 0; i < loadFiles.keys().length; i++) {
    loadFiles(loadFiles.keys()[i]);
}
require('./css/index.less');