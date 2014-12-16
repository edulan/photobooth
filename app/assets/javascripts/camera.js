(function(root) {
    var localMediaStream;

    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
    window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;

    var Camera = {
        startVideo: function($el) {
            function successCallback(stream) {
                var video = $el.get(0);

                localMediaStream = stream;

                $el.show();

                if (video.mozSrcObject !== undefined) {
                    video.mozSrcObject = stream;
                } else {
                    video.src = (window.URL && window.URL.createObjectURL(stream)) || stream;
                }

                video.play();
            }

            function errorCallback(error) {
                console.error('An error occurred: [' + error.name + '] ' + error.message);

                if (error.name === 'PermissionDeniedError') {
                    console.log('Camera access has been denied :(');
                }
            }

            if (navigator.getUserMedia) {
                navigator.getUserMedia({ video: true }, successCallback, errorCallback);
            } else {
                console.warn('Sorry, your browser does not support the HTML5 Stream API');
            }
        },

        stopVideo: function($el) {
            var video = $el.get(0);

            video.pause();
            video.src = '';

            if (localMediaStream) {
                localMediaStream.stop();
            }
        },

        capture: function($el, options) {
            var $canvas = $("<canvas>")
                    .addClass("snapshot")
                    .attr(options),
                canvas = $canvas.get(0),
                video = $el.get(0);

            context = $canvas.get(0).getContext("2d");
            context.drawImage(video, 0, 0, options.width, options.height);

            return canvas;
        }
    };

    root.PhotoBooth.Camera = Camera;
})(window);