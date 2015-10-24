var Clip = require('models/clip');
var Clips = require('collections/clips');
var ClipList = require('views/clips/list');
var ClipFullItem = require('views/clips/full-item');
var ClipBooth = require('views/clips/booth');

var Controller = Marionette.Controller.extend({
  initialize: function(options) {
    this.collection = new Clips();
  },

  index: function() {
    var view = new ClipList({
      collection: this.collection
    });

    this.collection.fetch();

    PhotoBooth.mainRegion.show(view);
  },

  'new': function() {
    var model = new Clip();
    var view = new ClipBooth({
      model: model
    });

    PhotoBooth.mainRegion.show(view);
  },

  show: function(id) {
    var model;

    if (!(model = this.collection.get(id))) {
      model = new Clip({
        id: id,
        snapshots: []
      });
      model.fetch();
    }

    var view = new ClipFullItem({
      model: model
    });

    PhotoBooth.mainRegion.show(view);
  }
});

module.exports = Controller;
