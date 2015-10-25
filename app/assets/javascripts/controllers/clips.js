var Clip = require('models/clip');
var Clips = require('collections/clips');
var ClipList = require('views/clips/list');
var ClipFullItem = require('views/clips/full-item');
var ClipBooth = require('views/clips/booth');

var Controller = Marionette.Controller.extend({
  initialize: function(options) {
    this.collection = PhotoBooth.Data.clips;
  },

  index: function() {
    var view = new ClipList({
      collection: this.collection
    });
    // Force collection sorting to reflect like updates
    this.collection.sort();

    PhotoBooth.root.content.show(view);
  },

  'new': function() {
    var model = new Clip();
    var view = new ClipBooth({
      collection: this.collection
    });

    PhotoBooth.root.content.show(view);
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

    PhotoBooth.root.content.show(view);
  }
});

module.exports = Controller;
