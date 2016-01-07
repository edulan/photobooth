var FeatureDetection = require('lib/feature-detection');
var Camera = require('lib/camera');
var UrlHelper = require('lib/url-helper');

var ClipBooth = Marionette.ItemView.extend({
  template: 'clips/new',

  ui: {
    message: '.js-message',
    startButton: '.js-start',
    retryButton: '.js-retry',
    flash: '.js-flash',
    counter: '.message-countdown',
    video: '#snap-preview',
  },

  events: {
    'click @ui.startButton': 'onStart',
    'click @ui.retryButton': 'onRetry',
    'animationend @ui.flash': 'resetFlash',
  },

  collectionEvents: {
    request: 'onRequest',
    add: 'onAdd',
    error: 'onError',
  },

  onShow: function() {
    var self = this;

    if (!FeatureDetection.isVideoSupported()) {
      this.ui.message
        .text('Sorry, your browser does not support video stream API')
        .show();
      return;
    }

    this.ui.message.empty();

    this.camera = new Camera(this.ui.video);
    this.camera.start()
      .then(function() {
        var $text = $('<p>')
          .addClass('text-info')
          .text('Take your time to make a good impression. When you\'re ready click start button');

        self.ui.message.html($text);
        self.ui.startButton.attr('disabled', false);
      })
      .catch(function(error) {
        var $text = $('<p>')
          .addClass('text-warning')
          .text(error.message);

        self.ui.message.html($text);
        self.ui.startButton.attr('disabled', true);
      });
  },

  onDestroy: function() {
    if (this.camera) {
      this.camera.stop();
    }
  },

  onStart: function(event) {
    var self = this;
    var startCountdown = self.startCountdown.bind(self);

    var finalCountdown = _.range(4).reduce(function(promise) {
      return promise.then(function (acumResult) {
        return startCountdown().then(function (result) {
          return acumResult.concat([result]);
        });
      });
    }, Promise.resolve([]));

    // It's the final countdown :trollface:
    finalCountdown.then(function(results) {
      _.each(results, function(blob, index) {
        var data = {};

        data['snapshot' + (index + 1)] = blob;
        self.model.addFormData(data);
      });

      self.collection.create(self.model, {
        url: UrlHelper.modelUrl(self.model, {booth_id: PhotoBooth.Data.booth.id}),
        multipart: true,
        wait: true,
      });
    })
    finalCountdown.catch(function () {
      console.error('Something went wrong saving clip');
    });

    self.ui.startButton.attr('disabled', true);
    self.ui.counter.show();

    event.preventDefault();
  },

  startCountdown: function () {
    var self = this;

    return new Promise(function (resolve) {
      var counter = PhotoBooth.Vars.countdown_seconds;

      var interval = setInterval(function () {
        if (counter > 0) {
          self.ui.counter.text(counter);
          counter--;
          return;
        }

        clearInterval(interval);

        self.ui.flash.addClass('flashin');
        resolve(self.captureSnapshot());
      }, 1000);

      self.ui.counter.text(counter);
      counter--;
    });
  },

  onRetry: function(event) {
    this.onShow();

    event.preventDefault();
  },

  onRequest: function() {
    var $text = $('<p>')
      .addClass('text-info')
      .html('Sending clip contents <i class="fa fa-cog fa-spin"></i>');

    this.ui.message.html($text);
    this.ui.counter.hide();
  },

  onAdd: function(model) {
    var $text = $('<p>')
      .addClass('text-success')
      .text('Clip created successfully!');

    this.ui.message.html($text);
    this.camera.stop();

    _.delay(function() {
      PhotoBooth.appRouter.navigate('clips/' + model.id, {trigger: true});
    }, 500);
  },

  onError: function() {
    var $text = $('<p>')
      .addClass('text-danger')
      .html('There was an error creating your clip, would you like to <a href="#" class="js-retry">retry?</a>');

    this.ui.message.html($text);
    this.camera.stop();
  },

  captureSnapshot: function() {
    return this.camera.capture({
      width: 480,
      height: 320,
      type: 'image/jpeg',
      quality: 0.8,
    });
  },

  resetFlash: function () {
    this.ui.flash.removeClass('flashin');
  },
});

module.exports = ClipBooth;
