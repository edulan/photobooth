var Vars = require('config/vars');
var Clips = require('collections/clips');
var ClipsRouter = require('router');
var ClipsController = require('controllers/clips');
var Root = require('views/root');

var PhotoBooth = new Marionette.Application();

PhotoBooth.addInitializer(function() {
  PhotoBooth.Vars = Vars;

  PhotoBooth.Data = {};
  PhotoBooth.Data.clips = new Clips();
  PhotoBooth.Data.clips.fetch();

  PhotoBooth.root = new Root();
  PhotoBooth.root.render();

  PhotoBooth.appRouter = new ClipsRouter({
    controller: new ClipsController()
  });

  Backbone.history.start();
});

module.exports = window.PhotoBooth = PhotoBooth;
