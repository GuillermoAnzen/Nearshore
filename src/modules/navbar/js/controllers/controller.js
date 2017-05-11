'use strict'

module.exports = function ($translate, locale) {
  console.log(locale.getDefaultLaguage());

  this.language = locale.getDefaultLaguage();

  this.changeLanguage = function () {
    $translate.use(this.language);
  }

};