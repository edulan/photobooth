var ClipsRouter = require('router');
var ClipsController = require('controllers/clips');
var Vars = require('config/vars');

var PhotoBooth = new Marionette.Application();

PhotoBooth.addInitializer(function() {
  PhotoBooth.addRegions({
    mainRegion: "section"
  });

  PhotoBooth.appRouter = new ClipsRouter({
    controller: new ClipsController()
  });

  PhotoBooth.Vars = Vars;

  Backbone.history.start();
});

module.exports = window.PhotoBooth = PhotoBooth;
