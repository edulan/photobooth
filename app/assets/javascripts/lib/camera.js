function Camera($el) {
  this.$video = $el;
  this.mediaStream = null;
}

Camera.prototype.getVideoEl = function() {
  return this.$video.get(0);
};

Camera.prototype.getMediaStream = function() {
  return this.mediaStream;
};

Camera.prototype.start = function() {
  var self = this;
  var mediaOptions = {
    video: true,
  };

  navigator.getUserMedia = navigator.getUserMedia ||
                           navigator.mediaDevices.getUserMedia;

  return new Promise(function(resolve, reject) {
    if (!navigator.getUserMedia) {
      reject({
        message: 'Sorry, your browser does not support the HTML5 Stream API',
        originalError: null,
      });
      return;
    }

    function success(mediaStream) {
      var video = self.getVideoEl();

      video.src = window.URL.createObjectURL(mediaStream);
      video.onloadedmetadata = function() {
        video.play();
        resolve();
      };

      self.mediaStream = mediaStream;
    }

    function error(err) {
      if (err.name === 'PermissionDeniedError') {
        reject({
          message: 'Camera access has been denied :(',
          originalError: err,
        });
        return;
      }

      reject({
        message: 'Cannot access the camera',
        originalError: err,
      });
    }

    navigator.getUserMedia(mediaOptions, success, error);
  });
};

Camera.prototype.stop = function() {
  this.stopStream();
  this.stopVideo();
};

Camera.prototype.stopVideo = function() {
  var video = this.getVideoEl();

  if (!video) {
    return;
  }

  video.pause();
  video.src = '';
};

Camera.prototype.stopStream = function() {
  var mediaStream = this.getMediaStream();

  if (!mediaStream) {
    return;
  }

  _.each(mediaStream.getVideoTracks(), function(streamTrack) {
    streamTrack.stop();
  });
};

/**
 * Captures an snapshot from video stream.
 *
 * Returns a promise object as data conversion
 * is an asynchronous process.
 *
 * @param  {Object} options
 * @return {Promise}
 */
Camera.prototype.capture = function(options) {
  var self = this;

  return new Promise(function(resolve, reject) {
    var $canvas = $('<canvas>').attr(options);
    var canvas = $canvas.get(0);
    var context = canvas.getContext('2d');
    var video = self.getVideoEl();

    context.drawImage(video, 0, 0, options.width, options.height);
    canvas.toBlob(function(blob) {
      resolve(blob);
    }, options.type, options.quality);
  });
};

module.exports = Camera;
