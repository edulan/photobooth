//= require polyfills/canvas-to-blob
//= require jquery
//= require bootstrap
//= require bootstrap-sprockets
//= require underscore
//= require backbone
//= require backbone.babysitter
//= require backbone.wreqr
//= require backbone.marionette
//= require_tree ./templates
//= require ./setup
//= require ./clips
//= require ./camera
//= require ./services

$(function() {
    PhotoBooth.start();
});