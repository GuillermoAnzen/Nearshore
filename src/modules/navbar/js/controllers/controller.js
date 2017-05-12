'use strict'

module.exports = function ($translate, locale,localeService) {
  console.log("Language local:"+locale.getDefaultLaguage());

  this.language = locale.getDefaultLaguage();

  this.changeLanguage = function () {
    locale.setDefaultLanguage.call((this.language).toString());
  }

};