var Upvote = require('models/upvote');
var UrlHelper = require('lib/url-helper');

var ClipFullItem = Marionette.ItemView.extend({
  template: 'clips/show',

  events: {
    'click .btn-like': 'onLike',
    'click .btn-delete': 'onDelete',
  },

  modelEvents: {
    change: 'render',
    destroy: 'onDestroy',
    error: 'onError',
  },

  onShow: function() {
    this.checkDelay = 0;
    this.checkCount = 0;
    this.checkProcessing(this.model);
  },

  checkProcessing: function(model) {
    if (!model.isProcessing()) {
      return;
    }

    if (this.checkCount > 4) {
      this.checkDelay = 0;
      this.checkCount = 0;
      this.model.markAsMissing();
      return;
    }

    this.checkDelay = 1000 * (Math.pow(2, this.checkCount) + Math.random());
    this.checkCount += 1;

    model.fetch({
      success: _.bind(function(model) {
        _.delay(
          _.bind(this.checkProcessing, this),
          this.checkDelay,
          model
        );
      }, this),
    });
  },

  onDestroy: function() {
    PhotoBooth.appRouter.navigate('clips', {trigger: true});
  },

  onError: function() {
    this.model.set('errors', [
      'Upss! Seems like this clip has been deleted',
    ]);
  },

  onLike: function(event) {
    var upvote = new Upvote();

    upvote.save(null, {
      url: UrlHelper.modelUrl(upvote, {clip_id: this.model.id}),
      success: _.bind(function(model, response) {
        this.model.set(response);
      }, this),
    });

    event.preventDefault();
  },

  onDelete: function(event) {
    if (confirm('Are you sure?')) {
      this.model.destroy({wait: true});
    }

    event.preventDefault();
  },

  serializeData: function () {
    var model = this.model;

    return _.extend({
      hasErrors: function () {
        return model.has('errors');
      },
    }, this.serializeModel(model));
  },
});

module.exports = ClipFullItem;
