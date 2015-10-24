(function(root) {
    var PhotoBooth = root.PhotoBooth;

    PhotoBooth.Lib = PhotoBooth.Lib || {};

    PhotoBooth.Lib.FeatureDetection = {
        isVideoSupported: function() {
            navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||
                navigator.mozGetUserMedia || navigator.msGetUserMedia;
            window.URL = window.URL || window.webkitURL ||
                window.mozURL || window.msURL;

            return !!navigator.getUserMedia;
        }
    };
})(window);
