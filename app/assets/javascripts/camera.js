(function(root) {
    var Camera = function($el) {
        this.$video = $el;
        this.stream = null;
    };

    Camera.prototype.startVideo = function() {
        var $deferred = $.Deferred(),
            $video = this.$video;

        if (!navigator.getUserMedia) {
            console.warn('Sorry, your browser does not support the HTML5 Stream API');
            return;
        }

        var successCallback = _.bind(function(stream) {
            var video = $video.show().get(0);

            this.stream = stream;

            if (video.mozSrcObject !== undefined) {
                video.mozSrcObject = stream;
            } else {
                video.src = (window.URL && window.URL.createObjectURL(stream)) || stream;
            }

            video.play();

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
        var video = this.$video.get(0);

        video.pause();
        video.src = '';

        if (this.stream) {
            this.stream.stop();
            this.stream = null;
        }
    };

    /**
     * Captures an snapshot from video stream
     * @param  {Object} options [description]
     * @return {Deferred}         [description]
     */
    Camera.prototype.capture = function(options) {
        var $canvas = $("<canvas>")
                .attr(options),
            $deferred = $.Deferred(),
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

    root.PhotoBooth.Camera = Camera;
})(window);