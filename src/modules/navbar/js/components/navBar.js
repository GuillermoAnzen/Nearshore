'use strict'
  var angular = require('angular');

  module.exports = angular.module('app.navbar').component('navBar', {
    template: require('../../views/navBar.html')
  });