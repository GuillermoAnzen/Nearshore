'use strict'
  var angular = require('angular');

  module.exports = angular.module('app.navbar',[]).component('navBar', {
    controller: require('./js/controllers/controller'),
    template: require('./views/navBar.html'),
    controllerAs: '$ctrl',
  });

require("./css/main.less");