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


module.exports = angular.module('app.users', [
    require('angular-route'),
    require('angular-sanitize'),
    require('angular-translate'),
    require('angular-utils-pagination')
]).config(['$routeProvider', '$translateProvider', 'localeProvider','paginationTemplateProvider', function($routeProvider, $translateProvider, localeProvider, paginationTemplateProvider) {

    //paginationTemplateProvider.setPath('/views/dirPagination.tpl.html');
    /***** i18n Configuration *****/
    localeProvider.init(require.context('./i18n/', false, /.js$/));
    /***** i18n Configuration *****/

    $routeProvider.when('/users', {
        template: require('./views/Main_users.html'),
        controller: 'userCtrl'
    });
}]);


var loadFiles = require.context('./js', true, /.js$/);
for (var i = 0; i < loadFiles.keys().length; i++) {
    loadFiles(loadFiles.keys()[i]);
}
require('./css/index.less');