var Camera = function($el) {
  this.$video = $el;
  this.stream = null;
};

Camera.prototype.getVideoEl = function() {
  if (!this.$video) {
    return null;
  }

  return this.$video.get(0);
};

Camera.prototype.startVideo = function() {
  var self = this;
  var $deferred = $.Deferred();

  if (!navigator.getUserMedia) {
    console.warn('Sorry, your browser does not support the HTML5 Stream API');
    return;
  }

  function success(stream) {
    var video = self.getVideoEl();
    // Client has requested to stop the video,
    // but browser dialog confirmation is still
    // waiting user confirmation.
    //
    // As soon as the user accepts video recording,
    // the stream is closed.
    if (!video) {
      stream.stop();
      return;
    }

    if (video.mozSrcObject !== undefined) {
      video.mozSrcObject = stream;
    } else {
      video.src = (window.URL && window.URL.createObjectURL(stream)) || stream;
    }

    video.play();
    self.stream = stream;

    $deferred.resolve();
  }

  function error(error) {
    if (error.name === 'PermissionDeniedError') {
      $deferred.reject({
        message: 'Camera access has been denied :(',
        originalError: error
      });
    } else {
      $deferred.reject({
        message: "Can't access the camera",
        originalError: error
      });
    }
  }

  navigator.getUserMedia({ video: true }, success, error);

  return $deferred;
};

Camera.prototype.stopVideo = function() {
  var video = this.getVideoEl();

  if (video === null) {
    return;
  }

  this.$video = null;

  video.pause();
  video.src = '';

  if (this.stream) {
    this.stream.stop();
    this.stream = null;
  }
};

/**
 * Captures an snapshot from video stream.
 *
 * Returns a deferred object as data conversion
 * is an asynchronous process.
 *
 * @param  {Object} options [description]
 * @return {Deferred}         [description]
 */
Camera.prototype.capture = function(options) {
  var $deferred = $.Deferred();
  var $canvas = $("<canvas>").attr(options);
  var canvas = $canvas.get(0);
  var video = this.getVideoEl();

  context = canvas.getContext("2d");
  context.drawImage(video, 0, 0, options.width, options.height);
  // Convert canvas to blob data
  canvas.toBlob(function(blob) {
    $deferred.resolve(blob);
  }, options.type, options.quality);

  return $deferred;
};

module.exports = Camera;
