//= require polyfills
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

//= require_tree ./templates

$(function() {
  require('photobooth').start();
});
