var Vars = require('config/vars');
var Booth = require('models/booth');
var Clips = require('collections/clips');
var ClipsRouter = require('router');
var ClipsController = require('controllers/clips');
var Root = require('views/root');

var PhotoBooth = new Marionette.Application();

PhotoBooth.addInitializer(function() {
  PhotoBooth.Vars = Vars;

  var booth_attributes = window.bootstrap.booth;

  PhotoBooth.Data = {};
  PhotoBooth.Data.booth = new Booth(booth_attributes);
  PhotoBooth.Data.clips = new Clips();
  PhotoBooth.Data.clips.fetch({
    data: {
      booth_id: PhotoBooth.Data.booth.id,
    },
  });

  PhotoBooth.root = new Root();
  PhotoBooth.root.render();

  PhotoBooth.appRouter = new ClipsRouter({
    controller: new ClipsController(),
  });

  Backbone.history.start();
});

module.exports = window.PhotoBooth = PhotoBooth;
