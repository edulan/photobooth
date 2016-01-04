var Clip = require('models/clip');
var FeatureDetection = require('lib/feature-detection');
var Camera = require('lib/camera');
var UrlHelper = require('lib/url-helper');

var ClipBooth = Marionette.ItemView.extend({
  template: "clips/new",

  events: {
    'click .btn-start': 'onStart',
    'click .btn-retry': 'onRetry'
  },

  modelEvents: {
    request: 'onRequest',
    sync: 'onSynced',
    error: 'onError',
  },

  ui: {
    message: '.js-message',
    startButton: '.btn-start',
    flash: '.cam-flash',
    counter: '.message-countdown',
    video: '#snap-preview'
  },

  onShow: function() {
    var self = this;

    if (!FeatureDetection.isVideoSupported()) {
      this.ui.message
        .text("Sorry, your browser does not support video stream API")
        .show();
      return;
    }

    this.ui.message.empty();

    this.camera = new Camera(this.ui.video);
    this.camera.start()
      .then(function() {
        var $text = $("<p>")
          .addClass("text-info")
          .text("Take your time to make a good impression. When you're ready click start button");

        self.ui.message.html($text);
        self.ui.startButton.attr('disabled', false);

      })
      .catch(function(error) {
        var $text = $("<p>")
          .addClass("text-warning")
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
    var countdownSeconds = PhotoBooth.Vars.countdownSeconds || 5,
      maxSnapshots = 4,
      snapshotsCount = 0,
      countdown = countdownSeconds;

    var self = this;

    function takeNext () {
      snapshotsCount++;

      if (snapshotsCount > maxSnapshots) {
        self.collection.create(self.model, {
          url: UrlHelper.modelUrl(self.model, {booth_id: PhotoBooth.Data.booth.id}),
          multipart: true,
        });
        return;
      }

      function updateCounter () {
        countdown--;

        if (countdown <= 0) {
          // Reset countdown
          countdown = countdownSeconds;
          self.ui.flash.show().fadeOut("slow");
          self.saveSnapshot('snapshot' + snapshotsCount).then(function() {
            takeNext();
          });
          return;
        }

        self.ui.counter.text(countdown);
        setTimeout(updateCounter, 1000);
      }

      self.ui.counter.text(countdown);
      setTimeout(updateCounter, 1000);
    }

    this.ui.startButton.attr('disabled', true);
    this.ui.counter.show();
    takeNext();

    event.preventDefault();
  },

  onRetry: function(event) {
    this.onShow();

    event.preventDefault();
  },

  onRequest: function(model) {
    var $text = $("<p>")
      .addClass("text-info")
      .html('Sending clip contents <i class="fa fa-cog fa-spin"></i>');

    this.ui.message.html($text);
    this.ui.counter.hide();
  },

  onSynced: function(model) {
    var $text = $("<p>")
      .addClass("text-success")
      .text("Clip created successfully!");

    this.ui.message.html($text);
    this.camera.stop();

    _.delay(function() {
      PhotoBooth.appRouter.navigate("clips/" + model.id, { trigger: true });
    }, 1000);
  },

  onError: function(model) {
    var $text = $("<p>")
      .addClass("text-danger")
      .html('There was an error creating your clip, would you like to <a href="#" class="btn-retry">retry?</a>');

    this.ui.message.html($text);
    this.camera.stop();
  },

  saveSnapshot: function(name) {
    var model = this.model;

    return this.camera.capture({
      width: 480,
      height: 320,
      type: 'image/jpeg',
      quality: 0.8,
    }).then(function(blob) {
      var data = {};

      data[name] = blob;
      model.addFormData(data);
    });
  },
});

module.exports = ClipBooth;
