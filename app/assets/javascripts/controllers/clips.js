var Clip = require('models/clip');
var ClipTimeline = require('views/clips/timeline');
var ClipFullItem = require('views/clips/full-item');
var ClipBooth = require('views/clips/booth');
var UrlHelper = require('lib/url-helper');

var Controller = Marionette.Controller.extend({
  initialize: function() {
    var Stream;

    this.model = PhotoBooth.Data.booth;
    this.collection = PhotoBooth.Data.clips;

    if (PhotoBooth.Vars.features.live_streaming) {
      Stream = require('lib/streams/model');
    } else {
      Stream = require('lib/streams/null');
    }

    this.stream = new Stream({
      url: UrlHelper.clipsStreamUrl(this.model),
      model: Clip,
    });
  },

  index: function() {
    var view = new ClipTimeline({
      stream: this.stream,
      model: this.model,
      collection: this.collection,
    });

    PhotoBooth.root.content.show(view);
  },

  new: function() {
    var model = new Clip();
    var view = new ClipBooth({
      model: model,
      collection: this.collection,
    });

    PhotoBooth.root.content.show(view);
  },

  show: function(id) {
    var model = this.collection.get(id);

    if (!model) {
      model = new Clip({
        id: id,
        snapshots: [],
      });
      model.fetch();
    }

    var view = new ClipFullItem({
      model: model,
    });

    PhotoBooth.root.content.show(view);
  },
});

module.exports = Controller;
