'use strict';
var angular = require('angular');
/**
 * @ngdoc service
 * @name app.locale.service:localeProvider
 * @param {Object} $translateProvider Module that they handle the languages
 * @description 
 * Service that set the default language 
 */
var localeProvider = function($translateProvider) {

    var languages = [
        'es-MX',
        'en-US'
    ];

    var defaultLanguage = languages[0];

    this.setDefaultLanguage = function(){
        defaultLanguage = this.toString();
    };

    /**
     * @ngdoc function
     * @name app.locale.function:getDefaultLanguage
     * @description This function get the default language. 
     * @param {null} this This function does not get parameters.
     * @returns {String} Return the default language.
     */

    this.getDefaultLaguage = function() {
        return defaultLanguage;
    };

    /**
     * @ngdoc function
     * @name app.locale.function:getLanguages
     * @description This function get all languages availables in the configuration of the application.
     * @param {null} this This function does not get parameters.
     * @returns {Array} Return the reference to languages.
     */
    this.getLanguages = function() {
        return languages;
    };

    this.init = function(translates) {
        for (var i = 0; i < translates.keys().length; i++) {
            $translateProvider.translations(translates(translates.keys()[i]).language, translates(translates.keys()[i]).translate);
        }
        $translateProvider.preferredLanguage(this.getDefaultLaguage());
        $translateProvider.useSanitizeValueStrategy('sanitize');
    };

    this.$get = function() {
        return {
            getDefaultLaguage: this.getDefaultLaguage,
            getLanguages: this.getLanguages,
            setDefaultLanguage: this.setDefaultLanguage
        };
    };
};

module.exports = angular.module('app.locale').provider('locale', localeProvider);