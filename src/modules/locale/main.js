var angular = require('angular');

/**
 * @ngdoc overview
 * @name app.locale
 * @description
 * This module is used to define and control the different languages involved in the application.
 */

module.exports = angular.module('app.locale', [
	require('angular-route'),
	require('angular-sanitize'),
	require('angular-translate')
]);

var loadFiles = require.context('./js', true, /.js$/);
for(var i = 0; i < loadFiles.keys().length; i++){
	loadFiles(loadFiles.keys()[i]);
}