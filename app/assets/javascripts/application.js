//= require polyfills/canvas-to-blob
//= require jquery
//= require bootstrap
//= require bootstrap-sprockets
//= require underscore
//= require backbone
//= require backbone.babysitter
//= require backbone.wreqr
//= require backbone.marionette
//= require backbone-extensions
//= require marionette-extensions

$(function() {
  var PhotoBooth = require('photobooth');

  PhotoBooth.start();
});
