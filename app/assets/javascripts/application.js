//= require polyfills/canvas-to-blob
//= require jquery
//= require bootstrap
//= require bootstrap-sprockets
//= require underscore
//= require backbone
//= require backbone.babysitter
//= require backbone.wreqr
//= require backbone.marionette
//= require backbone-overrides

//= require_tree ../templates
//= require ./marionette-jst
//= require ./photobooth
//= require ./models
//= require ./views
//= require ./controllers
//= require ./services

$(function() {
    PhotoBooth.start();
});