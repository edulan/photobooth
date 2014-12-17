(function(root) {
    var PhotoBooth = root.PhotoBooth;

    PhotoBooth.Services = PhotoBooth.Services || {};

    PhotoBooth.Services.FeatureDetection = {
        isVideoSupported: function() {
            navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||
                navigator.mozGetUserMedia || navigator.msGetUserMedia;
            window.URL = window.URL || window.webkitURL ||
                window.mozURL || window.msURL;

            return !!navigator.getUserMedia;
        }
    };

    var Camera = PhotoBooth.Services.Camera = function($el) {
        this.$video = $el;
        this.stream = null;
    };

    Camera.prototype.getVideo = function() {
        if (!this.$video) {
            return null;
        }

        return this.$video.get(0);
    };

    Camera.prototype.startVideo = function() {
        var $deferred = $.Deferred();

        if (!navigator.getUserMedia) {
            console.warn('Sorry, your browser does not support the HTML5 Stream API');
            return;
        }

        var successCallback = _.bind(function(stream) {
            var video = this.getVideo();
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
            this.stream = stream;

            $deferred.resolve();
        }, this);

        var errorCallback = _.bind(function(error) {
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
        }, this);

        navigator.getUserMedia({ video: true }, successCallback, errorCallback);

        return $deferred;
    };

    Camera.prototype.stopVideo = function() {
        var video = this.getVideo();

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
        var $deferred = $.Deferred(),
            $canvas = $("<canvas>")
                .attr(options),
            canvas = $canvas.get(0),
            video = this.$video.get(0);

        context = $canvas.get(0).getContext("2d");
        context.drawImage(video, 0, 0, options.width, options.height);
        // Convert canvas to blob data
        canvas.toBlob(function(blob) {
            $deferred.resolve(blob);
        }, options.type, options.quality);

        return $deferred;
    };
})(window);